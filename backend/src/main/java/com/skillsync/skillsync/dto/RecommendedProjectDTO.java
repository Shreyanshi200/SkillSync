package com.skillsync.skillsync.dto;

import com.skillsync.skillsync.entity.Skill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecommendedProjectDTO {
    private Long id;
    private String title;
    private String description;
    private List<Skill> Skills;
    private double matchPercentage;

}
