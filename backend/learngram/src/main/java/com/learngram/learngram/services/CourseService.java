package com.learngram.learngram.services;

import com.learngram.learngram.domain.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    Course saveCourse(Course course);
    List<Course> getAllCourses();
    Optional<Course> getCourseById(String courseId);
    boolean deleteCourse(String courseId, String userId);
    Course updateCourse(String courseId, Course course, String userId);
    List<Course> getCoursesByUser(String userId);
    List<Course> getEnrolledCourses(String userId);
    Course enrollInCourse(String courseId, String userId);
}
