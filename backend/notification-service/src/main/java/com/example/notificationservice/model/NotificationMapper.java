package com.example.notificationservice.model;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationDto notificationToNotificationDto(Notification notification);
}
