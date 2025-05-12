package com.learngram.learngram.controllers;

import com.learngram.learngram.domain.Notification;
import com.learngram.learngram.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Get notifications for a user
    @GetMapping
    public List<Notification.NotificationDetail> getNotifications(@RequestParam String userEmail) {
        return notificationService.getNotifications(userEmail);
    }

    // Send notification (no DTO used)
    @PostMapping("/send")
public void sendNotificationToFollowers(@RequestBody Map<String, Object> payload) {
    List<String> followerEmails = (List<String>) payload.get("followers");
    String postId = (String) payload.get("postId");
    String message = (String) payload.get("message");

    if (followerEmails != null && !followerEmails.isEmpty()) {
        for (String followerEmail : followerEmails) {
            notificationService.sendNotification(followerEmail, postId, message);
        }
    }
}

@PostMapping("/sendCourseNotification")
public void sendCourseNotificationToFollowers(@RequestBody Map<String, Object> payload) {
    List<String> followerEmails = (List<String>) payload.get("followers");
    String courseId = (String) payload.get("courseId");
    String message = (String) payload.get("message");

    if (followerEmails != null && !followerEmails.isEmpty()) {
        for (String followerEmail : followerEmails) {
            notificationService.sendNotification(followerEmail, courseId, message);
        }
    }
}

    // Mark notifications as read
    @PutMapping("/read")
    public void markAsRead(@RequestParam String userEmail) {
        notificationService.markNotificationsAsRead(userEmail);
    }

    @DeleteMapping("/all")
    public ResponseEntity<Void> deleteAllNotifications(@RequestParam String userEmail) {
        try {
            notificationService.deleteAllNotifications(userEmail);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    
}
