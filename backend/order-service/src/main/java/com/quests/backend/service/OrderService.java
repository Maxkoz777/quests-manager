package com.quests.backend.service;

import com.example.common.events.FraudCheckMessage;
import com.example.common.events.FraudResultMessage;
import com.example.common.events.NotificationMessage;
import com.example.common.events.PaymentCreationMessage;
import com.example.common.events.PaymentReservationMessage;
import com.example.common.events.enums.OrderStatus;
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
    private KafkaTemplate<String, PaymentCreationMessage> kafkaTemplate;

    @Autowired
    private KafkaTemplate<String, NotificationMessage> notificationKafkaTemplate;

    @Autowired
    private KafkaTemplate<String, FraudCheckMessage> fraudKafkaTemplate;

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    public List<Order> getAllAvailableOrders(String userId) {
        var orders = orderRepository.findOrderByCreatorIdIsNot(userId);
        log.info("Retrieved {} order(s) from storage", orders.size());
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
        var paymentMessage = new PaymentCreationMessage(traceId, orderId, 12.34, creatorId, userId);
        kafkaTemplate.send("payment.initiate", paymentMessage);
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
}