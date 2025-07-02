package com.skillsync.skillsync.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSkillResponseDTO {
    private String skillName;
    private String proficiencyLevel;
}
