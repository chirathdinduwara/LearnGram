package com.learngram.learngram.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;




import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
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

    //time

    

}

