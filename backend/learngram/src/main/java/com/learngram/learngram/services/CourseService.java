package com.learngram.learngram.services;

import com.learngram.learngram.domain.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    Course createCourse(Course course);
    List<Course> getAllCourses();
    List<Course> getCoursesByUser(String userId);
    Optional<Course> getCourseById(String courseId);
    Course updateCourse(String courseId, Course course);
    boolean deleteCourse(String courseId);
    Course enrollInCourse(String courseId, String userId);
    List<Course> getEnrolledCourses(String userId);
    boolean unenrollFromCourse(String courseId, String userId);
}
