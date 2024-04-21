package com.quests.backend.service;

import com.example.common.events.FraudCheckMessage;
import com.example.common.events.FraudResultMessage;
import com.example.common.events.NotificationMessage;
import com.example.common.events.PaymentMessage;
import com.example.common.events.PaymentReservationMessage;
import com.example.common.events.enums.OrderStatus;
import com.example.common.events.enums.PaymentStatus;
import com.quests.backend.exception.NoSuchOrderException;
import com.quests.backend.model.OrderMapper;
import com.quests.backend.model.dto.OrderCreationRequest;
import com.quests.backend.model.entity.Order;
import com.quests.backend.repository.OrderRepository;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    @Autowired
    private KafkaTemplate<String, PaymentMessage> paymentKafkaTemplate;

    @Autowired
    private KafkaTemplate<String, NotificationMessage> notificationKafkaTemplate;

    @Autowired
    private KafkaTemplate<String, FraudCheckMessage> fraudKafkaTemplate;

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    public List<Order> getAllAvailableOrders(String userId) {
        var orders = orderRepository.findOrderByCreatorIdIsNotAndOrderStatusEquals(userId, OrderStatus.CREATED);
        log.info("Retrieved {} order(s) that can be executed by user {}", orders.size(), userId);
        return orders;
    }

    public List<Order> getAllCreatedOrders(String userId) {
        var orders = orderRepository.findOrderByCreatorIdIs(userId);
        log.info("Retrieved {} order(s) created by user {}", orders.size(), userId);
        return orders;
    }

    public List<Order> getAllTakenOrders(String userId) {
        var orders = orderRepository.findOrderByExecutorIdIs(userId);
        log.info("Retrieved {} order(s) that are taken by user {}", orders.size(), userId);
        return orders;
    }

    public List<Order> getAllCurrentOrders(String userId) {
        var orders = orderRepository.findOrderByExecutorIdIs(userId).stream()
            .filter(order -> order.getOrderStatus() == OrderStatus.IN_PROGRESS)
            .toList();
        log.info("Retrieved {} order(s) that are currently being executed by user {}", orders.size(), userId);
        return orders;
    }

    public void createOrder(String userId, OrderCreationRequest orderCreationRequest) {
        log.info("Creating order \"{}\"", orderCreationRequest.title());
        var traceId = UUID.randomUUID().toString();
        var order = orderMapper.getOrderFromRequest(orderCreationRequest);
        order.setOrderStatus(OrderStatus.INITIATED);
        order.setCreatorId(userId);
        orderRepository.save(order);
        log.info("Order with id={} created", order.getId());
        log.info("Sending order for the fraud checking service");
        var fraudCheckMessage = new FraudCheckMessage(traceId, order.getId(), order.getDescription());
        fraudKafkaTemplate.send("fraud.check.initiate", fraudCheckMessage)
            .whenComplete((result, error) -> log.info("Fraud check initiated for the orderId={}", order.getId()));
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }

    public void executeOrder(long orderId, String userId) {
        log.info("Payment process initiated for order {}", orderId);
        var traceId = UUID.randomUUID().toString();
        var order = orderRepository.findById(orderId).orElseThrow(RuntimeException::new);
        var creatorId = order.getCreatorId();
        var paymentMessage = new PaymentMessage(traceId, orderId, 12.34, creatorId, userId);
        paymentKafkaTemplate.send("payment.initiate", paymentMessage);
        log.info("Payment process initiating, returning result to client");
    }

    @KafkaListener(topics = "payment.reservation.updated")
    public void processPaymentNotification(PaymentReservationMessage message) {
        log.info("Received payment reservation message: {}", message);
        var notification = new NotificationMessage(message.traceId(), message.orderId(),
                                                   "Payment validated, the task can be executed");
        log.info("Sending payment notification to user");
        var orderOptional = orderRepository.findById(message.orderId());
        if (orderOptional.isPresent()) {
            var order = orderOptional.get();
            order.setOrderStatus(OrderStatus.IN_PROGRESS);
            order.setExecutorId(message.executorId());
            order.setExecutionStartTime(Instant.now());
            log.info("Updating the status for order {}", message.orderId());
            orderRepository.saveAndFlush(order);
        }
        notificationKafkaTemplate.send("user.notification.order.update", notification)
            .whenComplete((result, error) -> log.info("Notification successfully sent"));
    }

    @KafkaListener(topics = "fraud.check.completed")
    public void processFraudValidationResponse(FraudResultMessage fraudResultMessage) {
        log.info("Received fraud validation message: {}", fraudResultMessage);
        var orderOptional = orderRepository.findById(fraudResultMessage.orderId());
        if (orderOptional.isPresent()) {
            var order = orderOptional.get();
            order.setOrderStatus(OrderStatus.CREATED);
            log.info("Updating the status for order {}", fraudResultMessage.orderId());
            orderRepository.saveAndFlush(order);
        }
    }

    public void finishOrderExecution(long orderId, String userId) {
        var traceId = UUID.randomUUID().toString();
        var order = orderRepository.findById(orderId).orElseThrow(NoSuchOrderException::new);
        if (!order.getExecutorId().equals(userId)) {
            log.error("Order {} is not being executed by the current user {}", orderId, userId);
            throw new RuntimeException("Order is not being executed by the current user");
        }
        log.info("Retrieved order with id={}", order.getId());
        order.setOrderStatus(OrderStatus.EXECUTION_FINISHED);
        log.info("Sending notification for the Order owner for confirmation");
        var notification = new NotificationMessage(traceId, orderId,
                                                   "Your order \"%s\" was executed, please confirm it".formatted(
                                                       order.getTitle()));
        notificationKafkaTemplate.send("user.notification.order.update", notification)
            .whenComplete((result, error) -> log.info("Notification successfully sent"));
        orderRepository.saveAndFlush(order);
    }

    public void validateOrderExecution(long orderId, String userId) {
        var traceId = UUID.randomUUID().toString();
        var order = orderRepository.findById(orderId).orElseThrow(NoSuchOrderException::new);
        if (!order.getCreatorId().equals(userId)) {
            log.error("Order {} was not created by the current user {}", orderId, userId);
            throw new RuntimeException("Order was not created by the current user");
        }
        log.info("Retrieved order with id={}", order.getId());
        log.info("Sending message to payment service for money transaction execution");
        var paymentMessage = new PaymentMessage(traceId, orderId, order.getCost(), order.getCreatorId(), order.getExecutorId());
        paymentKafkaTemplate.send("payment.execution", paymentMessage)
            .whenComplete((result, error) -> log.info("Payment successfully sent for execution"));
    }

    @KafkaListener(topics = "order.finalization")
    public void finalizeOrderStatus(PaymentReservationMessage message) {
        log.info("Received payment processing message: {}", message);
        var order = orderRepository.findById(message.orderId()).orElseThrow(NoSuchOrderException::new);
        String content;
        if (message.status() == PaymentStatus.SUCCESSFUL) {
            order.setOrderStatus(OrderStatus.DONE);
            content = "Payment transaction processed successfully";
        } else {
            content = "Payment unsuccessful";
        }
        var notification = new NotificationMessage(message.traceId(), message.orderId(), content);
        log.info("Sending payment notification to user");
        orderRepository.saveAndFlush(order);
        notificationKafkaTemplate.send("user.notification.order.update", notification)
            .whenComplete((result, error) -> log.info("Notification successfully sent"));
    }
}