package com.learngram.learngram.services.impl;

import com.learngram.learngram.domain.Course;
import com.learngram.learngram.repositories.CourseRepository;
import com.learngram.learngram.services.CourseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public Course createCourse(Course course) {
        course.setCreatedAt(java.time.LocalDateTime.now());
        course.setUpdatedAt(java.time.LocalDateTime.now());
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public List<Course> getCoursesByUser(String userId) {
        return courseRepository.findByCreatedBy(userId);
    }

    @Override
    public Optional<Course> getCourseById(String courseId) {
        return courseRepository.findById(courseId);
    }

    @Override
    public Course updateCourse(String courseId, Course courseUpdate) {
        Optional<Course> existingOpt = courseRepository.findById(courseId);
        if (existingOpt.isPresent()) {
            Course existing = existingOpt.get();
            existing.setTitle(courseUpdate.getTitle());
            existing.setDescription(courseUpdate.getDescription());
            existing.setContent(courseUpdate.getContent());
            existing.updateTimestamps();
            return courseRepository.save(existing);
        } else {
            throw new RuntimeException("Course not found with ID: " + courseId);
        }
    }

    @Override
    public boolean deleteCourse(String courseId) {
        if (courseRepository.existsById(courseId)) {
            courseRepository.deleteById(courseId);
            return true;
        }
        return false;
    }

    @Override
    public Course enrollInCourse(String courseId, String userId) {
        Optional<Course> existingOpt = courseRepository.findById(courseId);
        if (existingOpt.isPresent()) {
            Course course = existingOpt.get();
            course.enrollUser(userId);
            return courseRepository.save(course);
        } else {
            throw new RuntimeException("Course not found with ID: " + courseId);
        }
    }
}
