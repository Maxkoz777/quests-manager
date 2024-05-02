package com.example.paymentservice.service;

import com.example.paymentservice.model.dto.PaymentRequest;
import com.example.paymentservice.model.entity.Payment;
import com.example.paymentservice.repository.PaymentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    public static final String ORGANISATION_ID = "-1";
    private final PaymentRepository paymentRepository;

    public void addMoney(String userId, PaymentRequest paymentRequest) {
        log.info("Adding {} rub to the user={} account", paymentRequest.amount(), userId);
        var payment = getPaymentForUser(userId);
        payment.setBalance(payment.getBalance() + paymentRequest.amount());
        paymentRepository.saveAndFlush(payment);
        log.info("Payment successfully added for user={} account", userId);
    }

    public String getBalance(String userId) {
        log.info("Retrieving balance for user={}", userId);
        var payment = getPaymentForUser(userId);
        log.info("Balance successfully obtained for user={} account", userId);
        return String.valueOf(payment.getBalance());
    }

    @Transactional
    public boolean transferMoney(String fromUserId, String toUserId, double amount) {
        var fromPayment = getPaymentForUser(fromUserId);
        var toPayment = getPaymentForUser(toUserId);
        if (fromPayment.getBalance() >= amount) {
            fromPayment.setBalance(fromPayment.getBalance() - amount);
            toPayment.setBalance(toPayment.getBalance() + amount);
            log.info("{} rub transferred successfully from user={} to user={}", amount, fromUserId, toUserId);
            return true;
        } else {
            log.warn("Not enough money on user={} account to pay for order execution", fromUserId);
            return false;
        }
    }

    private Payment getPaymentForUser(String userId) {
        var optionalPaymentAccount = paymentRepository.findByUserId(userId);
        if (optionalPaymentAccount.isPresent()) {
            return optionalPaymentAccount.get();
        } else {
            log.info("No account found for user={}, creating new one", userId);
            return createPaymentAccount(userId, 0);
        }
    }

    private Payment createPaymentAccount(String userId, double amount) {
        log.info("Creating payment account for the user={} with {} rub", userId, amount);
        var payment = new Payment(userId, amount);
        paymentRepository.saveAndFlush(payment);
        log.info("Payment account successfully created for the user={}", userId);
        return payment;
    }
}
