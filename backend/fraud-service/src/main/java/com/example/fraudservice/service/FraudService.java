package com.example.fraudservice.service;

import com.example.common.events.FraudCheckMessage;
import com.example.common.events.FraudResultMessage;
import com.example.common.events.enums.FraudStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class FraudService {

    @Autowired
    private KafkaTemplate<String, FraudResultMessage> kafkaTemplate;

    @KafkaListener(topics = "fraud.check.initiate")
    public void validateOrder(FraudCheckMessage fraudCheckMessage) {
        log.info("Validating order with id={}", fraudCheckMessage.orderId());
        var resultMessage = new FraudResultMessage(fraudCheckMessage.traceId(), fraudCheckMessage.orderId(),
                                                   FraudStatus.ACCEPTED);
        kafkaTemplate.send("fraud.check.completed", resultMessage)
            .whenComplete((result, error) -> log.info("Fraud check result successfully sent for orderId={}",
                                                      fraudCheckMessage.orderId()));
    }

}