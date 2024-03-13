package com.quests.backend.model.dto;

public record OrderCreationRequest(
    String title,
    String description,
    double cost
){}