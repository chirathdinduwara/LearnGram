package com.learngram.learngram.repositories;

import com.learngram.learngram.domain.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByCreatedBy(String userId);
    List<Course> findByEnrolledUsersContaining(String userId);
}
