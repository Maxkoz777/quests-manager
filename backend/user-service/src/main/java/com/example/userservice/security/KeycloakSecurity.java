package com.example.userservice.security;

import com.example.userservice.config.KeycloakConfigurationProperties;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakSecurity {

    @Bean
    public Keycloak keycloak(KeycloakConfigurationProperties keycloakProperties) {
        return KeycloakBuilder.builder()
                .serverUrl(keycloakProperties.serverUrl())
                .realm(keycloakProperties.realm())
                .clientId(keycloakProperties.clientId())
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientSecret(keycloakProperties.clientSecret())
                .build();
    }
}