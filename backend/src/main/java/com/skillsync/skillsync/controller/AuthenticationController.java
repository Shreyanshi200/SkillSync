package com.skillsync.skillsync.controller;

import com.skillsync.skillsync.dto.AuthRequestDTO;
import com.skillsync.skillsync.dto.AuthResponseDTO;
import com.skillsync.skillsync.dto.RegisterRequestDTO;
import com.skillsync.skillsync.entity.User;
import com.skillsync.skillsync.security.JwtService;
import com.skillsync.skillsync.service.AuthenticationService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;


    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterRequestDTO registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> authenticate(@RequestBody AuthRequestDTO loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        AuthResponseDTO loginResponse = AuthResponseDTO.builder()
                .token(jwtToken)
                .build();

        return ResponseEntity.ok(loginResponse);
    }
}
