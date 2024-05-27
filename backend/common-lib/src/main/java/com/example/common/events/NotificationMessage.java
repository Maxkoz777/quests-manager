package com.example.common.events;

public record NotificationMessage(
    String traceId,
    String userId,
    String content
){}
