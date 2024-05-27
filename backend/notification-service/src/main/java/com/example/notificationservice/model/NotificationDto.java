package com.example.notificationservice.model;

import lombok.Data;

@Data
public class NotificationDto {
    private String id;
    private String message;
    private boolean isRead;
}
