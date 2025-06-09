package com.skillsync.skillsync.controller;


import com.skillsync.skillsync.dto.ProjectDTO;
import com.skillsync.skillsync.dto.projectResponseDTO;
import com.skillsync.skillsync.entity.Project;
import com.skillsync.skillsync.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Project>addProject(@RequestBody ProjectDTO dto){
        return ResponseEntity.ok(projectService.addProject(dto));
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Project>updateProject(@PathVariable Long id,@RequestBody ProjectDTO dto){
        return ResponseEntity.ok(projectService.updateProject(id,dto));
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void>deleteProject(@PathVariable Long id){
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping
    public ResponseEntity<List<projectResponseDTO>>getAll(){
        List<projectResponseDTO>projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
}
