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
@Document(collection = "notification")
public class Notification {

    @Id
    private String id;

    private String userEmail;


    private List<NotificationDetail> notifications;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class NotificationDetail {
        private String postId;
        private String message;
        
    }
}
