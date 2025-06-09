package com.skillsync.skillsync.repository;

import com.skillsync.skillsync.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.*;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User>findByEmail(String email);

}
