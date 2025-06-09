package com.skillsync.skillsync.controller;

import com.skillsync.skillsync.dto.SkillDTO;
import com.skillsync.skillsync.entity.Skill;
import com.skillsync.skillsync.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {
    private final SkillService skillService;

    @PostMapping
    public ResponseEntity<Skill>addSkill(@RequestBody SkillDTO skillDTO){
        return ResponseEntity.ok(skillService.addSkill(skillDTO));
    }
    @GetMapping
    public ResponseEntity<List<Skill>>getMySkills(){
        return ResponseEntity.ok(skillService.getMySkills());
    }
    @DeleteMapping("/{skillId}")
    public ResponseEntity<Void>deleteSkill(@PathVariable Long skillId, @AuthenticationPrincipal UserDetails userDetails){
        skillService.deleteSkill(skillId,userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
