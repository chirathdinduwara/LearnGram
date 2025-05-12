package com.learngram.learngram.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
@Document(collection = "stories")
public class Story {

    @Id
    private String storyId;

    private String userId;

    private String userName;

    private String contentUrl;

    private String caption;

    private String userProfileImage;

    private String location;

    public Story() {
    }
}
