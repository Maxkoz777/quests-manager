package com.example.notificationservice.repository;

import com.example.notificationservice.model.Notification;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByUserId(String userId);

    @Query("""
        select n
        from Notification n
        where n.userId = ?1 and n.isRead = false
    """)
    List<Notification> findAllNewNotifications(String userId);
}
