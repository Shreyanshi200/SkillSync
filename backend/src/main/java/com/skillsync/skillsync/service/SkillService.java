package com.skillsync.skillsync.service;

import com.skillsync.skillsync.dto.SkillDTO;
import com.skillsync.skillsync.entity.Skill;
import com.skillsync.skillsync.entity.User;
import com.skillsync.skillsync.repository.SkillRepository;
import com.skillsync.skillsync.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {
    private final SkillRepository skillRepository;
    private final UserRepository userRepository;
    private User getCurrentUser(){
        String mail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(mail).orElseThrow();
    }
    public Skill addSkill(SkillDTO skillDTO){
        Skill skill = Skill.builder().name(skillDTO.getName())
                .proficiencyLevel(skillDTO.getProficiencyLevel())
                .user(getCurrentUser()).build();
        return skillRepository.save(skill);
    }
    public List<Skill>getMySkills(){
        return skillRepository.findByUser(getCurrentUser());
    }
    public void deleteSkill(Long skillId, String userEmail){
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));
        System.out.println("Authenticated user: " + getCurrentUser().getEmail());
        System.out.println("Skill belongs to: " + skill.getUser().getEmail());
        if (!skill.getUser().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("You are not allowed to delete this skill.");
        }

        skillRepository.deleteById(skillId);
    }

}
