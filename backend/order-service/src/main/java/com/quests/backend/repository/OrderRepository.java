package com.quests.backend.repository;

import com.example.common.events.enums.OrderStatus;
import com.quests.backend.model.entity.Order;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findOrderByCreatorIdIsNotAndOrderStatusEquals(String creatorId, OrderStatus orderStatus);

    List<Order> findOrderByCreatorIdIs(String creatorId);

    List<Order> findOrderByExecutorIdIs(String executorId);
}
