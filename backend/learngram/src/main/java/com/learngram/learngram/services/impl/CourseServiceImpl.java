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
        return courseRepository.findById(courseId).map(course -> {
            if (!course.getCreatedBy().equals(userId)) {
                throw new RuntimeException("Unauthorized");
            }

            if (updatedCourse.getTitle() != null) course.setTitle(updatedCourse.getTitle());
            if (updatedCourse.getDescription() != null) course.setDescription(updatedCourse.getDescription());
            if (updatedCourse.getContent() != null) course.setContent(updatedCourse.getContent());

            course.updateTimestamps();
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
            if (!course.getEnrolledUsers().contains(userId)) {
                course.getEnrolledUsers().add(userId);
                course.updateTimestamps();
                return courseRepository.save(course);
            } else {
                return course;
            }
        }).orElseThrow(() -> new RuntimeException("Course not found"));
    }
}
