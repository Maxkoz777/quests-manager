package com.example.paymentservice;

import com.example.paymentservice.model.entity.Payment;
import com.example.paymentservice.repository.PaymentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@Slf4j
@SpringBootApplication
public class PaymentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PaymentServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner setupMainPaymentAccount(PaymentRepository paymentRepository) {
        return args -> {
            // Your logic here
            log.info("Validation of payment account on startup");
            var paymentOptional = paymentRepository.findByUserId("-1");
            if (paymentOptional.isEmpty()) {
                var payment = new Payment("-1", 0);
                paymentRepository.saveAndFlush(payment);
                log.info("Payment account successfully created for the admin user");
            }
        };
    }

}
