package com.quests.backend.repository;

import com.quests.backend.model.entity.Order;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findOrderByCreatorIdIsNot(String creatorId);
}
