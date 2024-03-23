package com.example.userservice.service;

import com.example.userservice.config.KeycloakConfigurationProperties;
import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final Keycloak keycloak;
    private final UserMapper userMapper;
    private final KeycloakConfigurationProperties keycloakConfigurationProperties;

    public void createUser(UserDto userDto) {
        var representation = userMapper.userDtoToUserRepresentation(userDto);
        var realm = keycloak.realm(keycloakConfigurationProperties.realm());
        realm.users().create(representation);
    }
}