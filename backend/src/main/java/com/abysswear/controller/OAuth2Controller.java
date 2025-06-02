package com.abysswear.controller;

import com.abysswear.dto.AuthResponse;
import com.abysswear.entity.User;
import com.abysswear.service.OAuth2Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/oauth2")
@RequiredArgsConstructor
@Tag(name = "OAuth2", description = "OAuth2 authentication endpoints")
public class OAuth2Controller {

    private final OAuth2Service oauth2Service;

    @GetMapping("/success")
    @Operation(summary = "Handle OAuth2 authentication success")
    public ResponseEntity<AuthResponse> handleOAuth2Success(@AuthenticationPrincipal OAuth2User oauth2User) {
        String email = oauth2User.getAttribute("email");
        User user = (User) oauth2User;
        return ResponseEntity.ok(oauth2Service.generateAuthResponse(user));
    }

    @GetMapping("/failure")
    @Operation(summary = "Handle OAuth2 authentication failure")
    public ResponseEntity<String> handleOAuth2Failure() {
        return ResponseEntity.badRequest().body("OAuth2 authentication failed");
    }
} 