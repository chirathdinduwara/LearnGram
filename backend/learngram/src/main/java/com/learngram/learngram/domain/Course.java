package com.learngram.learngram.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "course")
public class Course {

    @Id
    private String courseId;
    private String title;
    private String description;
    private List<Content> content;
    private String createdBy;
    private List<String> enrolledUsers;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static class Content {
        private String type;  // "text" or "image"
        private String value; // text content or image URL

        public Content() {
        }

        public Content(String type, String value) {
            this.type = type;
            this.value = value;
        }

        // Getters and Setters
        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }

    public void addContent(Content contentItem) {
        if (this.content == null) {
            this.content = new ArrayList<>();
        }
        this.content.add(contentItem);
    }

    public void enrollUser(String userId) {
        if (this.enrolledUsers == null) {
            this.enrolledUsers = new ArrayList<>();
        }
        if (!this.enrolledUsers.contains(userId)) {
            this.enrolledUsers.add(userId);
        }
    }

    public void updateTimestamps() {
        this.updatedAt = LocalDateTime.now();
    }
}
