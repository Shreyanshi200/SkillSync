package com.skillsync.skillsync.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class projectResponseDTO {
    private Long id;
    private String title;
    private String description;
    private List<String> skillNames;
}
