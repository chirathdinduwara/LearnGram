package com.learngram.learngram.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
@Document(collection = "post")
public class Post {

    @Id
    private String postId;

    private String userId;

    private String userName;

    private String contentUrl;

    private String caption;

    private String UserProfileImage;

    private String location;

    public Post() {
    }

}
