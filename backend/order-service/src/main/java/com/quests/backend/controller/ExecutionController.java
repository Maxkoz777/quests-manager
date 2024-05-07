package com.quests.backend.controller;

import com.quests.backend.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders/execution")
@SecurityRequirement(name = "Keycloak")
@Tag(name = "Execution Controller", description = "Execution controller APIs")
public class ExecutionController {

    private final OrderService orderService;

    @Operation(
        summary = "Execute order",
        description = "Take an order with provided id for execution"
    )
    @ApiResponse(responseCode = "200")
    @ApiResponse(responseCode = "401")
    @PostMapping("/start/{orderId}")
    public ResponseEntity<String> initTaskExecution(@PathVariable("orderId") long orderId, Principal principal) {
        var userId = principal.getName();
        log.info("Initiated task execution with orderId={} by user={}", orderId, userId);
        orderService.executeOrder(orderId, userId);
        return ResponseEntity.ok("Task execution request is sent for processing");
    }

    @Operation(
        summary = "Finish order",
        description = "Finish order execution with provided id"
    )
    @ApiResponse(responseCode = "200")
    @ApiResponse(responseCode = "401")
    @PostMapping("/finish/{orderId}")
    public ResponseEntity<String> finishTaskExecution(@PathVariable("orderId") long orderId, Principal principal) {
        var userId = principal.getName();
        log.info("Initiated task finalization process with orderId={} by user={}", orderId, userId);
        orderService.finishOrderExecution(orderId, userId);
        return ResponseEntity.ok("Order is marked finished by the doer");
    }

    @Operation(
        summary = "Finish order",
        description = "Finish order execution with provided id"
    )
    @ApiResponse(responseCode = "200")
    @ApiResponse(responseCode = "401")
    @PostMapping("/validate/{orderId}")
    public ResponseEntity<String> validateOrderExecution(@PathVariable("orderId") long orderId, Principal principal) {
        var userId = principal.getName();
        log.info("Validating order execution process with orderId={} by user={}", orderId, userId);
        orderService.validateOrderExecution(orderId, userId);
        return ResponseEntity.ok("Order was closed by the author");
    }
}
