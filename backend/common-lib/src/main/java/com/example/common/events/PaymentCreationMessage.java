package com.example.common.events;

public record PaymentCreationMessage(
    String traceId,
    long orderId,
    double cost,
    String creatorId,
    String executorId
) {}
