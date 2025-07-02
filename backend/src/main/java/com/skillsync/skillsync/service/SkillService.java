package com.skillsync.skillsync.service;

import com.skillsync.skillsync.dto.SkillDTO;
import com.skillsync.skillsync.dto.SkillResponseDTO;
import com.skillsync.skillsync.entity.Skill;
import com.skillsync.skillsync.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillResponseDTO createSkill(SkillDTO dto) {
        if (skillRepository.findByName(dto.getName()).isPresent()) {
            throw new RuntimeException("Skill already exists");
        }

        Skill skill = Skill.builder()
                .name(dto.getName())
                .build();

        skill = skillRepository.save(skill);
        return new SkillResponseDTO(skill.getId(), skill.getName());
    }

    public List<SkillResponseDTO> getAllSkills() {
        return skillRepository.findAll()
                .stream()
                .map(skill -> new SkillResponseDTO(skill.getId(), skill.getName()))
                .collect(Collectors.toList());
    }

    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}

