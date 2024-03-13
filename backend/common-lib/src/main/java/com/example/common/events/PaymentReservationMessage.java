package com.example.common.events;

import com.example.common.events.enums.PaymentStatus;

public record PaymentReservationMessage(
    String traceId,
    long orderId,
    PaymentStatus status,
    String message
) {}
