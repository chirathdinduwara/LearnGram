package com.learngram.learngram.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
@Document(collection = "course")
public class Course {
    @Id
    private String courseId;
    private String title;
    private String description;
    private List<String> content;
    private String createdBy;
    private List<String> enrolledUsers;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Course() {
        this.content = new ArrayList<>();
        this.enrolledUsers = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public void updateTimestamps() {
        this.updatedAt = LocalDateTime.now();
    }
}
