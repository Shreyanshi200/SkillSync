package com.skillsync.skillsync.service;

import com.skillsync.skillsync.dto.AuthRequestDTO;
import com.skillsync.skillsync.dto.RegisterRequestDTO;
import com.skillsync.skillsync.entity.Role;
import com.skillsync.skillsync.entity.User;
import com.skillsync.skillsync.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public User signup(RegisterRequestDTO input) {
        User user = User.builder()
                .name(input.getName())
                .email(input.getEmail())
                .password(passwordEncoder.encode(input.getPassword()))
                .role(Role.USER)
                .build();

        return userRepository.save(user);
    }

    public User authenticate(AuthRequestDTO input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }
}
