package com.quests.backend.service;

import com.quests.backend.model.entity.Order;
import com.quests.backend.repository.OrderRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        var orders = orderRepository.findAll();
        log.info("Retrieved {} order(s) from storage", orders.size());
        return orders;
    }

    public long createOrder(Order order) {
        orderRepository.save(order);
        log.info("Order with id={} created", order.getId());
        return order.getId();
    }

}