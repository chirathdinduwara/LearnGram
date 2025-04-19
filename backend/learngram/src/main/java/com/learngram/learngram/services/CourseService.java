package com.learngram.learngram.services;

import com.learngram.learngram.domain.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {

    // Create a new course
    Course saveCourse(Course course);

    // Get all courses
    List<Course> getAllCourses();

    // Get a specific course by ID
    Optional<Course> getCourseById(String courseId);

    // Delete a course by ID
    boolean deleteCourse(String courseId);

    // Update a course
    Course updateCourse(String courseId, Course updatedCourse);

    // Get all published courses
    List<Course> getPublishedCourses();
}
