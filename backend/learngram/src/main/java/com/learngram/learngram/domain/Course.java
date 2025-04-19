package com.learngram.learngram.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
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

    private List<String> content; // List of content items (could be URLs, texts, etc.)

    private boolean isPublished;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String createdBy; // User ID (since we're storing the ID of the user who created the course)

    public Course() {
        // Default constructor for MongoDB
    }

    // Optionally, you can add methods to handle automatic timestamps here (e.g., @PrePersist) if needed
    public void setTimestamps() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }
}
