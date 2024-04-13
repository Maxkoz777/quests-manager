package com.quests.backend.model.dto;

import java.time.Instant;

public record OrderCreationRequest (
    String title,
    String description,
    Double latitude,
    Double longitude,
    Long executionDuration,
    Instant executionPeriodStart,
    Instant executionPeriodEnd,
    double cost
){}