package com.skillsync.skillsync.repository;

import com.skillsync.skillsync.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,Long> {
}
