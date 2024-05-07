package com.example.paymentservice.controller;

import com.example.paymentservice.model.dto.PaymentRequest;
import com.example.paymentservice.service.PaymentService;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Void> addMoney(
        @RequestBody PaymentRequest paymentRequest,
        Principal principal
    ) {
        var userId = principal.getName();
        paymentService.addMoney(userId, paymentRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<String> getBalance(Principal principal) {
        var userId = principal.getName();
        var balance = paymentService.getBalance(userId);
        return ResponseEntity.ok(balance);
    }
}