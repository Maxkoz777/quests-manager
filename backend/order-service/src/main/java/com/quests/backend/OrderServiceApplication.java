package com.quests.backend;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SecurityScheme(
	name = "Keycloak",
	openIdConnectUrl = "http://localhost:8080/realms/prototype/.well-known/openid-configuration",
	scheme = "bearer",
	type = SecuritySchemeType.OPENIDCONNECT,
	in = SecuritySchemeIn.HEADER
)
@SpringBootApplication
public class OrderServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderServiceApplication.class, args);
	}

}
