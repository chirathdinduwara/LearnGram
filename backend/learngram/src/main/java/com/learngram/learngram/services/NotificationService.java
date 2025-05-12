package com.learngram.learngram.services;

import com.learngram.learngram.domain.Notification;
import java.util.List;

public interface NotificationService {

    List<Notification.NotificationDetail> getNotifications(String userEmail);

    void sendNotification(String userEmail, String postId, String message);

    void markNotificationsAsRead(String userEmail);

    void deleteAllNotifications(String userEmail);
}
