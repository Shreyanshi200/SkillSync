package com.skillsync.skillsync.dto;

import lombok.Data;

import java.util.List;

//for incoming data
@Data
public class ProjectDTO {
    private String title;
    private String description;
    private List<Long>skillIds;
}
