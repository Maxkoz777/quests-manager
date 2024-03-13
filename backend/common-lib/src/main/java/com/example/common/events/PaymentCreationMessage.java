package com.example.common.events;

public record PaymentCreationMessage(
    String jwt,
    String traceId,
    long orderId,
    double cost
) {}
