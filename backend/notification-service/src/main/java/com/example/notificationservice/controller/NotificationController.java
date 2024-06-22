package com.example.notificationservice.controller;

import com.example.notificationservice.model.NotificationDto;
import com.example.notificationservice.service.NotificationService;
import java.security.Principal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationDto>> getAllNotifications(Principal principal) {
        var userId = principal.getName();
        var notifications = notificationService.getAllNotifications(userId);
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/new")
    public ResponseEntity<List<NotificationDto>> getAllNewNotifications(Principal principal) {
        var userId = principal.getName();
        var notifications = notificationService.getNewNotifications(userId);
        return ResponseEntity.ok(notifications);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotificationById(@PathVariable("id") long id, Principal principal) {
        var userId = principal.getName();
        notificationService.deleteNotificationForUserById(userId, id);
        return ResponseEntity.noContent().build();
    }
}
