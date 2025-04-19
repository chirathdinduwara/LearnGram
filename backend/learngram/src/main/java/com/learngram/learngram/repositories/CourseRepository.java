package com.learngram.learngram.repositories;

import com.learngram.learngram.domain.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByIsPublished(boolean isPublished);
}
