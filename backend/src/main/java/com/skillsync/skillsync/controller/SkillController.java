package com.skillsync.skillsync.controller;

import com.skillsync.skillsync.dto.SkillDTO;
import com.skillsync.skillsync.dto.SkillResponseDTO;
import com.skillsync.skillsync.entity.Skill;
import com.skillsync.skillsync.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/skills")
@RequiredArgsConstructor
public class SkillController {
    private final SkillService skillService;

    @PostMapping
    public ResponseEntity<SkillResponseDTO> createSkill(@RequestBody SkillDTO dto) {
        return ResponseEntity.ok(skillService.createSkill(dto));
    }

    @GetMapping
    public ResponseEntity<List<SkillResponseDTO>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
}
