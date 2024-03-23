package com.example.userservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "admin.keycloak")
public record KeycloakConfigurationProperties(
    String serverUrl,
    String realm,
    String clientId,
    String grantType,
    String clientSecret
) {}