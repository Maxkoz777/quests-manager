package com.example.common.events;

public record PaymentCreationMessage(
    String jwt,
    String traceId,
    String orderId,
    double cost
) {}
