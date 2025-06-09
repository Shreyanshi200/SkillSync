package com.skillsync.skillsync.repository;

import com.skillsync.skillsync.entity.Skill;
import com.skillsync.skillsync.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill,Long> {
    List<Skill> findByUser(User user);
}
