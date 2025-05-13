package com.learngram.learngram.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "interactions")
public class Interaction {

    @Id
    private String id;

    private String postId;
    private String userId;
    private String userName;
    private String userProfilePic;
    private String comment;

    private List<Like> likes;

}
