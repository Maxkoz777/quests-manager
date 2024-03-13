package com.example.paymentservice.service;

import com.example.common.events.PaymentCreationMessage;
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

    public void reservePayment() {
        log.info("Sending predefined message to order service");
        var paymentReservationMessage = new PaymentReservationMessage(
            "traceId", 1234, PaymentStatus.SUCCESSFUL, "some message"
        );
        var sendingResult = kafkaTemplate.send(
            "payment.reservation.updated", paymentReservationMessage);
        sendingResult.whenComplete((result, error) -> log.info("Message successfully sent"));
    }

    @KafkaListener(topics = "payment.initiate")
    public void receivePaymentRequest(PaymentCreationMessage message) {
        log.info("Received message from order service: {}", message);
        this.reservePayment();
    }

}
