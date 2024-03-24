package com.quests.backend.controller;

import com.quests.backend.model.dto.OrderCreationRequest;
import com.quests.backend.model.entity.Order;
import com.quests.backend.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.security.Principal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
@SecurityRequirement(name = "Keycloak")
@Tag(name = "Order Controller", description = "Order controller APIs")
public class OrderController {

    private final OrderService orderService;

    @Operation(
        summary = "Get all orders",
        description = "Get list of all orders from storage"
    )
    @ApiResponse(
        responseCode = "200",
        content = {@Content(schema = @Schema(implementation = Order.class))}
    )
    @ApiResponse(responseCode = "401")
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(Principal principal) {
        var userId = principal.getName();
        var orders = orderService.getAllAvailableOrders(userId);
        return ResponseEntity.ok(orders);
    }

    @Operation(
        summary = "Create order",
        description = "Create an order for provided properties"
    )
    @ApiResponse(
        responseCode = "201",
        content = {@Content(schema = @Schema(implementation = Order.class))}
    )
    @ApiResponse(responseCode = "401")
    @PostMapping
    public ResponseEntity<Long> createOrder(Principal principal,
                                            @RequestBody OrderCreationRequest orderCreationRequest) {
        var userId = principal.getName();
        orderService.createOrder(userId, orderCreationRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Operation(
        summary = "Get order by id",
        description = "Create an order for provided properties"
    )

    @ApiResponse(
        responseCode = "200",
        content = {@Content(schema = @Schema(implementation = Order.class))}
    )
    @ApiResponse(responseCode = "400")
    @ApiResponse(responseCode = "401")
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        var optionalOrder = orderService.getOrderById(id);
        if (optionalOrder.isPresent()) {
            log.info("Order with id={} retrieved successfully", optionalOrder.get().getId());
            return ResponseEntity.ok(optionalOrder.get());
        } else {
            log.warn("No order with such id");
            return ResponseEntity.badRequest().build();
        }
    }

    @Operation(
        summary = "Delete order by id",
        description = "Delete an order with given id"
    )
    @ApiResponse(responseCode = "204")
    @ApiResponse(responseCode = "401")
    @DeleteMapping("/{id}")
    public ResponseEntity<Order> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrderById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
        summary = "Execute order",
        description = "Take an order with provided id for execution"
    )
    @ApiResponse(responseCode = "200")
    @ApiResponse(responseCode = "401")
    @PostMapping("/execute/{orderId}")
    public ResponseEntity<String> initTaskExecution(@PathVariable("orderId") long orderId, Principal principal) {
        var userId = principal.getName();
        log.info("Initiated task execution with orderId={} by user={}", orderId, userId);
        orderService.executeOrder(orderId, userId);
        return ResponseEntity.ok("Task execution request is sent for processing");
    }
}
