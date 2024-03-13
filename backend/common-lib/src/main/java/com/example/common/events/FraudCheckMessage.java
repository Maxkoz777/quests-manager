package com.example.common.events;

public record FraudCheckMessage(
    String traceId,
    long orderId,
    String content
){}
