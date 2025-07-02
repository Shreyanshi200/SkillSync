package com.skillsync.skillsync.service;


import com.skillsync.skillsync.dto.UserSkillDTO;
import com.skillsync.skillsync.dto.UserSkillResponseDTO;
import com.skillsync.skillsync.entity.Skill;
import com.skillsync.skillsync.entity.User;
import com.skillsync.skillsync.entity.UserSkill;
import com.skillsync.skillsync.repository.SkillRepository;
import com.skillsync.skillsync.repository.UserRepository;
import com.skillsync.skillsync.repository.UserSkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserSkillService {
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final UserSkillRepository userSkillRepository;
    public void addUserSkills(List<UserSkillDTO> skillDTOs){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        for(UserSkillDTO dto:skillDTOs){
            Skill skill = skillRepository.findById(dto.getSkillId()).orElseThrow(()->new RuntimeException("Skill not found"));
            UserSkill userSkill = UserSkill.builder().user(user)
                    .skill(skill).proficiencyLevel(dto.getProficiencyLevel()).build();
            userSkillRepository.save(userSkill);
        }
    }
    public List<UserSkillResponseDTO>getMySkills(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return userSkillRepository.findByUser(user).stream().map(
                us->new UserSkillResponseDTO(us.getSkill().getName(),us.getProficiencyLevel())
        ).collect(Collectors.toList());
    }
}
