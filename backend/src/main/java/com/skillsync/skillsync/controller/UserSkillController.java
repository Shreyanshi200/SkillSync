package com.skillsync.skillsync.controller;

import com.skillsync.skillsync.dto.UserSkillDTO;
import com.skillsync.skillsync.dto.UserSkillResponseDTO;
import com.skillsync.skillsync.service.UserSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/skills")
@RequiredArgsConstructor
public class UserSkillController {
    private final UserSkillService userSkillService;

    @PostMapping
    public ResponseEntity<String>addUserSkills(@RequestBody List<UserSkillDTO> skillDTOs){
        userSkillService.addUserSkills(skillDTOs);
        return ResponseEntity.ok("Skills added successfully");
    }
    @GetMapping
    public ResponseEntity<List<UserSkillResponseDTO>>getMySkills(){
        return ResponseEntity.ok(userSkillService.getMySkills());
    }

}
