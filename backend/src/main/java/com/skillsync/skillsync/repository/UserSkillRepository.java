package com.skillsync.skillsync.repository;

import com.skillsync.skillsync.entity.User;
import com.skillsync.skillsync.entity.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill,Long> {
    List<UserSkill> findByUser(User user);
    boolean existsByUserAndSkill_Id(User user, Long skillId);
}
