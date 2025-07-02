package com.skillsync.skillsync.service;

import com.skillsync.skillsync.dto.RecommendedProjectDTO;
import com.skillsync.skillsync.entity.Project;
import com.skillsync.skillsync.entity.Skill;
import com.skillsync.skillsync.entity.User;
import com.skillsync.skillsync.repository.ProjectRepository;
import com.skillsync.skillsync.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    public List<RecommendedProjectDTO> getRecommendedProjects() {
        String mail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(mail).orElseThrow();

        Set<String> userSkillNames = user.getSkills().stream()
                .map(userSkill -> userSkill.getSkill().getName())
                .collect(Collectors.toSet());

        List<Project> allProjects = projectRepository.findAll();

        return allProjects.stream()
                .map(project -> {
                    List<Skill> projectSkills = project.getRequiredSkills();
                    Set<String> projectSkillNames = projectSkills.stream()
                            .map(Skill::getName)
                            .collect(Collectors.toSet());

                    long matchedCount = projectSkillNames.stream()
                            .filter(userSkillNames::contains)
                            .count();

                    double matchPercentage = projectSkills.isEmpty() ? 0.0 :
                            ((double) matchedCount / projectSkills.size()) * 100;

                    return RecommendedProjectDTO.builder()
                            .id(project.getId())
                            .title(project.getTitle())
                            .description(project.getDescription())
                            .Skills(projectSkills)  // <-- Set the skills list
                            .matchPercentage(Math.round(matchPercentage * 100.0) / 100.0)
                            .build();
                })
                .sorted((p1, p2) -> Double.compare(p2.getMatchPercentage(), p1.getMatchPercentage()))
                .limit(10)
                .collect(Collectors.toList());
    }

}
