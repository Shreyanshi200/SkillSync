package com.skillsync.skillsync.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequestDTO {
    private String email;
    private String password;
}
