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
    private List<Content> content;  // Store text and images as objects
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

    // Define Content as a separate entity (could be text or file)
    @Data
    @AllArgsConstructor
    public static class Content {
        private String type; // text or image
        private String value; // the content itself (either text or file path)
    }
}
