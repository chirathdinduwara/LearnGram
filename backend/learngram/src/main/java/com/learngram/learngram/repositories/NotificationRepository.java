package com.learngram.learngram.repositories;

import com.learngram.learngram.domain.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface NotificationRepository extends MongoRepository<Notification, String> {

    Optional<Notification> findByUserEmail(String userEmail);
    public void deleteByUserEmail(String userEmail);
}
