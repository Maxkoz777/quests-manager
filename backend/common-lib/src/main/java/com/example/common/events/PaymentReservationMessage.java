package com.example.common.events;

import com.example.common.events.enums.PaymentStatus;

public record PaymentReservationMessage(
    String traceId,
    String orderId,
    PaymentStatus status,
    String message
) {}
