package com.quests.backend.model.entity;

import com.example.common.events.enums.OrderStatus;
import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "order_tbl")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String description;
    private double cost;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    private String creatorId;
    private String executorId;
    private Double latitude;
    private Double longitude;
    private Long executionDuration;
    private Instant executionPeriodStart;
    private Instant executionPeriodEnd;
    @CreationTimestamp
    private Instant createdOn;
    private Instant executionStartTime = null;
    private Instant executionFinishTime = null;
}