package com.example.common.events;

public record PaymentMessage(
    String traceId,
    long orderId,
    double cost,
    String creatorId,
    String executorId
) {}
