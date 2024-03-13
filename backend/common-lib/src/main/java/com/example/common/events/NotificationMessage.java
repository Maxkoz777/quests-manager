package com.example.common.events;

public record NotificationMessage(
    String traceId,
    long userId,
    String content
){}
