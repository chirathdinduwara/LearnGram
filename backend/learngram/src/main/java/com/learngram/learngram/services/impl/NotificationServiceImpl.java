package com.learngram.learngram.services.impl;

import com.learngram.learngram.domain.Notification;
import com.learngram.learngram.repositories.NotificationRepository;
import com.learngram.learngram.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<Notification.NotificationDetail> getNotifications(String userEmail) {
        return notificationRepository.findByUserEmail(userEmail)
                .map(Notification::getNotifications)
                .orElse(new ArrayList<>());
    }

    @Override
    public void sendNotification(String userEmail, String postId, String message) {
        Notification notification = notificationRepository.findByUserEmail(userEmail)
                .orElseGet(() -> new Notification(null, userEmail, new ArrayList<>()));

        Notification.NotificationDetail detail = new Notification.NotificationDetail(postId, message);
        notification.getNotifications().add(detail);

        notificationRepository.save(notification);
    }

    @Override
    public void markNotificationsAsRead(String userEmail) {
        Optional<Notification> optional = notificationRepository.findByUserEmail(userEmail);
        optional.ifPresent(notification -> {
            notification.getNotifications().clear(); // Or add a `read` flag logic here
            notificationRepository.save(notification);
        });
    }

    @Override
    public void deleteAllNotifications(String userEmail) {
        notificationRepository.deleteByUserEmail(userEmail);
    }
}
