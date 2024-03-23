package com.example.userservice.model.mapper;

import com.example.userservice.model.dto.UserDto;
import java.util.Collections;
import java.util.List;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "emailVerified", constant = "true")
    @Mapping(target = "enabled", constant = "true")
    @Mapping(target = "credentials", expression = "java(mapCredentials(userDto.getPassword()))")
    UserRepresentation userDtoToUserRepresentation(UserDto userDto);

    default List<CredentialRepresentation> mapCredentials(String password) {
        if (password == null || password.isEmpty()) {
            return Collections.emptyList();
        }

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setTemporary(false);
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(password);

        return Collections.singletonList(credential);
    }
}