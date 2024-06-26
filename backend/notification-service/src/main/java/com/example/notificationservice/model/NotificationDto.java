package com.example.notificationservice.model;

import lombok.Data;

@Data
public class NotificationDto {
    private Long id;
    private String message;
    private boolean isRead;
}
