package com.example.paymentservice.service;

import com.example.common.events.PaymentMessage;
import com.example.common.events.PaymentReservationMessage;
import com.example.common.events.enums.PaymentStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PaymentService {

    @Autowired
    private KafkaTemplate<String, PaymentReservationMessage> kafkaTemplate;

    @KafkaListener(topics = "payment.initiate")
    public void receivePaymentRequest(PaymentMessage message) {
        log.info("Received message from order service: {}", message);
        log.info("Sending predefined message to order service");
        var paymentReservationMessage = new PaymentReservationMessage(
            "traceId",
            message.orderId(),
            PaymentStatus.SUCCESSFUL,
            "some message",
            message.creatorId(),
            message.executorId()
        );
        var sendingResult = kafkaTemplate.send(
            "payment.reservation.updated", paymentReservationMessage);
        sendingResult.whenComplete((result, error) -> log.info("Message successfully sent"));
    }

    @KafkaListener(topics = "payment.execution")
    public void processPayment(PaymentMessage message) {
        log.info("Received message from order service: {}", message);
        log.info("Sending predefined message to order service");
        var paymentReservationMessage = new PaymentReservationMessage(
            "traceId",
            message.orderId(),
            PaymentStatus.SUCCESSFUL,
            "Order payed successfully",
            message.creatorId(),
            message.executorId()
        );
        var sendingResult = kafkaTemplate.send(
            "order.finalization", paymentReservationMessage);
        sendingResult.whenComplete((result, error) -> log.info("Message successfully sent"));
    }

}
