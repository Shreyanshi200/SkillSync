package com.skillsync.skillsync.service;

import com.skillsync.skillsync.dto.ProjectDTO;
import com.skillsync.skillsync.dto.projectResponseDTO;
import com.skillsync.skillsync.entity.Project;
import com.skillsync.skillsync.entity.Skill;
import com.skillsync.skillsync.repository.ProjectRepository;
import com.skillsync.skillsync.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;

    public Project addProject(ProjectDTO dto){
        List<Skill> skills = skillRepository.findAllById(dto.getSkillIds());
        Project project = Project.builder().
                title(dto.getTitle()).Description(dto.getDescription()).requiredSkills(skills).
                build();
        return projectRepository.save(project);
    }

    public List<projectResponseDTO>getAllProjects(){
        List<Project>projects = projectRepository.findAll();
        return projects.stream().map(this::mapToDTO).collect(Collectors.toList());

    }
    public void deleteProject(Long projectId){
        projectRepository.deleteById(projectId);
    }
    public Project updateProject(Long pId,ProjectDTO dto){
        Project project = projectRepository.findById(pId).orElseThrow(()->new RuntimeException("Project not found"));
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        if(dto.getSkillIds()!=null && !dto.getSkillIds().isEmpty()){
            List<Skill>updatedSkills = skillRepository.findAllById(dto.getSkillIds());
            project.setRequiredSkills(updatedSkills);
        }

        return projectRepository.save(project);
    }
    private projectResponseDTO mapToDTO(Project project){
        return projectResponseDTO.builder().id(project.getId()).
                title(project.getTitle()).description(project.getDescription()).
                skillNames(project.getRequiredSkills().stream()
                        .map(Skill::getName).collect(Collectors.toList())).build();
    }
}
