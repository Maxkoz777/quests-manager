package com.example.configurationservice.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic orderCreationInitiated() {
        return TopicBuilder.name("order.creation.initiated")
            .partitions(1)
            .replicas(1)
            .build();
    }

    @Bean
    public NewTopic orderExecutionFinished() {
        return TopicBuilder.name("order.execution.finished")
            .partitions(1)
            .replicas(1)
            .build();
    }

    @Bean
    public NewTopic orderWorkStarted() {
        return TopicBuilder.name("order.work.started")
            .partitions(1)
            .replicas(1)
            .build();
    }

    @Bean
    public NewTopic orderCreated() {
        return TopicBuilder.name("order.created")
            .partitions(1)
            .replicas(1)
            .build();
    }

    @Bean
    public NewTopic paymentInitiate() {
        return TopicBuilder.name("payment.initiate")
            .partitions(1)
            .replicas(1)
            .build();
    }

    @Bean
    public NewTopic fraudCheckInitiate() {
        return TopicBuilder.name("fraud.check.initiate")
            .partitions(1)
            .replicas(1)
            .build();
    }

    @Bean
    public NewTopic userNotificationOrderUpdate() {
        return TopicBuilder.name("user.notification.order.update")
            .partitions(1)
            .replicas(1)
            .build();
    }

    @Bean
    public NewTopic fraudCheckCompleted() {
        return TopicBuilder.name("fraud.check.completed")
            .partitions(1)
            .replicas(1)
            .build();
    }

    @Bean
    public NewTopic paymentReservationUpdated() {
        return TopicBuilder.name("payment.reservation.updated")
            .partitions(1)
            .replicas(1)
            .build();
    }

    @Bean
    public NewTopic paymentExecution() {
        return TopicBuilder.name("payment.execution")
            .partitions(1)
            .replicas(1)
            .build();
    }

    @Bean
    public NewTopic orderFinalization() {
        return TopicBuilder.name("order.finalization")
            .partitions(1)
            .replicas(1)
            .build();
    }
}