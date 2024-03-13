package com.quests.backend.service;

import com.example.common.events.PaymentCreationMessage;
import com.example.common.events.PaymentReservationMessage;
import com.quests.backend.model.entity.Order;
import com.quests.backend.repository.OrderRepository;
import java.util.List;
import java.util.Optional;
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

    private final OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        var orders = orderRepository.findAll();
        log.info("Retrieved {} order(s) from storage", orders.size());
        return orders;
    }

    public long createOrder(Order order) {
        orderRepository.save(order);
        log.info("Order with id={} created", order.getId());
        return order.getId();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }

    public void initTaskExecution() {
        log.info("Payment process initiated");
        var paymentMessage = new PaymentCreationMessage("jwt", "traceId", "orderId", 12.34);
        kafkaTemplate.send("payment.initiate", paymentMessage);
    }

    @KafkaListener(topics = "payment.reservation.updated")
    public void receiveMessage(PaymentReservationMessage message) {
        log.info("Received payment reservation message: {}", message);
    }
}