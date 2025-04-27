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
    public Course saveCourse(Course course) {
        // Ensure that timestamps are updated when saving
        course.updateTimestamps();
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Optional<Course> getCourseById(String courseId) {
        return courseRepository.findById(courseId);
    }

    @Override
    public boolean deleteCourse(String courseId, String userId) {
        Optional<Course> courseOpt = courseRepository.findById(courseId);
        if (courseOpt.isPresent() && courseOpt.get().getCreatedBy().equals(userId)) {
            courseRepository.deleteById(courseId);
            return true;
        }
        return false;
    }

    @Override
    public Course updateCourse(String courseId, Course updatedCourse, String userId) {
        // Find the existing course by ID
        return courseRepository.findById(courseId).map(course -> {
            // Ensure the user is authorized to update the course
            if (!course.getCreatedBy().equals(userId)) {
                throw new RuntimeException("Unauthorized");
            }

            // Update course fields only if they are non-null
            if (updatedCourse.getTitle() != null) course.setTitle(updatedCourse.getTitle());
            if (updatedCourse.getDescription() != null) course.setDescription(updatedCourse.getDescription());
            if (updatedCourse.getContent() != null) {
                // Update content if provided
                course.setContent(updatedCourse.getContent());
            }

            // Update timestamps
            course.updateTimestamps();

            // Save and return the updated course
            return courseRepository.save(course);
        }).orElseThrow(() -> new RuntimeException("Course not found"));
    }

    @Override
    public List<Course> getCoursesByUser(String userId) {
        return courseRepository.findByCreatedBy(userId);
    }

    @Override
    public List<Course> getEnrolledCourses(String userId) {
        return courseRepository.findByEnrolledUsersContaining(userId);
    }

    @Override
    public Course enrollInCourse(String courseId, String userId) {
        return courseRepository.findById(courseId).map(course -> {
            // Enroll the user in the course if they are not already enrolled
            if (!course.getEnrolledUsers().contains(userId)) {
                course.getEnrolledUsers().add(userId);
                course.updateTimestamps();
                return courseRepository.save(course);
            } else {
                // If already enrolled, just return the course
                return course;
            }
        }).orElseThrow(() -> new RuntimeException("Course not found"));
    }
}
