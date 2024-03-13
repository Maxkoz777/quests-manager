package com.example.common.events;

import com.example.common.events.enums.FraudStatus;

public record FraudResultMessage(
    String traceId,
    long orderId,
    FraudStatus fraudStatus
) {}
