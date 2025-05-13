package com.learngram.learngram.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Like {
    @Field("userEmail")
    private String userEmail;

    @Field("liked")
    private boolean liked;
}
