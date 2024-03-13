package com.example.notificationservice.service;

import com.example.common.events.NotificationMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class NotificationService {

    @KafkaListener(topics = "user.notification.order.update")
    public void consumeNotification(NotificationMessage notificationMessage) {
        log.info("Consumed message for user with id={}: {}", notificationMessage.userId(),
                 notificationMessage.content());
    }

}