package com.quests.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/demo")
@SecurityRequirement(name = "Keycloak")
@CrossOrigin(origins = "*")
@Tag(name = "Demo Controller", description = "Demo controller APIs")
public class DemoController {

    @Operation(
        summary = "Get hello message",
        description = "Get a hello message from demo controller"
    )
    @ApiResponse(
        responseCode = "200",
        content = { @Content(schema = @Schema(implementation = String.class)) }
    )
    @ApiResponse(responseCode = "401")
    @GetMapping
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello from Demo controller");
    }

}
