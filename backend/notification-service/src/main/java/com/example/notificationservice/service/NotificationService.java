package com.example.notificationservice.service;

import com.example.common.events.NotificationMessage;
import com.example.notificationservice.model.NotificationDto;
import com.example.notificationservice.model.Notification;
import com.example.notificationservice.model.NotificationMapper;
import com.example.notificationservice.repository.NotificationRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    @KafkaListener(topics = "user.notification.order.update")
    public void consumeNotification(NotificationMessage notificationMessage) {
        log.info("Consumed message for user with id={}: {}", notificationMessage.userId(),
                 notificationMessage.content());
        log.info("Saving notifications to the database");
        var notification = notificationRepository.saveAndFlush(
            new Notification(notificationMessage.userId(), notificationMessage.content())
        );
        log.info("Notification {} saved successfully", notification.getId());
    }

    public List<NotificationDto> getAllNotifications(String userId) {
        log.info("Getting all the notifications for user with id={}", userId);
        var notifications = notificationRepository.findAllByUserId(userId);
        log.info("All notifications are marked as read for user with id={}", userId);
        markNotificationsAsReadForUser(userId, notifications);
        return notifications.stream()
            .map(notificationMapper::notificationToNotificationDto)
            .toList();
    }

    public List<NotificationDto> getNewNotifications(String userId) {
        log.info("Getting all new notifications for user with id={}", userId);
        var notifications = notificationRepository.findAllNewNotifications(userId);
        log.info("{} unseen notifications retrieved for user with id={}", notifications.size(), userId);
        markNotificationsAsReadForUser(userId, notifications);
        return notifications.stream()
            .map(notificationMapper::notificationToNotificationDto)
            .toList();
    }

    private void markNotificationsAsReadForUser(String userId, List<Notification> notifications) {
        notifications.forEach(notification -> notification.setRead(true));
        notificationRepository.saveAllAndFlush(notifications);
        log.info("Retrieved notifications are marked as read for user with id={}", userId);
    }
}