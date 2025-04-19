package com.learngram.learngram.services.impl;

import com.learngram.learngram.domain.Course;
import com.learngram.learngram.repositories.CourseRepository;
import com.learngram.learngram.services.CourseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public Course saveCourse(Course course) {
        // Set timestamps for course
        course.setTimestamps();
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getAllCourses() {
        // Convert Iterable to List
        return StreamSupport.stream(
            courseRepository.findAll().spliterator(), false)
            .collect(Collectors.toList());
    }

    @Override
    public Optional<Course> getCourseById(String courseId) {
        return courseRepository.findById(courseId);
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
    public Course updateCourse(String courseId, Course updatedCourse) {
        Optional<Course> existingCourseOpt = courseRepository.findById(courseId);
        
        if (existingCourseOpt.isPresent()) {
            Course existingCourse = existingCourseOpt.get();

            // Update the fields that are not null in the provided course
            if (updatedCourse.getTitle() != null) {
                existingCourse.setTitle(updatedCourse.getTitle());
            }
            if (updatedCourse.getDescription() != null) {
                existingCourse.setDescription(updatedCourse.getDescription());
            }
            if (updatedCourse.getContent() != null) {
                existingCourse.setContent(updatedCourse.getContent());
            }
            existingCourse.setUpdatedAt(updatedCourse.getUpdatedAt()); // Always update the timestamp

            return courseRepository.save(existingCourse);
        } else {
            throw new RuntimeException("Course not found with ID: " + courseId);
        }
    }

    @Override
    public List<Course> getPublishedCourses() {
        // Fetch only the published courses
        return courseRepository.findByIsPublished(true);
    }
}
