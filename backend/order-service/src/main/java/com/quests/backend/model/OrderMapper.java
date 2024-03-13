package com.quests.backend.model;

import com.quests.backend.model.dto.OrderCreationRequest;
import com.quests.backend.model.entity.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order getOrderFromRequest(OrderCreationRequest request);
}
