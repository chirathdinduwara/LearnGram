package com.learngram.learngram.controllers;

import com.learngram.learngram.domain.Course;
import com.learngram.learngram.services.CourseService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // Create a new course
    @PostMapping(path = "/courses")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        course.setTimestamps();
        Course savedCourse = courseService.saveCourse(course);
        return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
    }

    // List all courses
    @GetMapping(path = "/courses")
    public List<Course> listCourses() {
        List<Course> courses = courseService.getAllCourses();
        return courses;
    }

    // Get a specific course by ID
    @GetMapping(path = "/courses/{courseId}")
    public ResponseEntity<Course> getCourse(@PathVariable("courseId") String courseId) {
        Optional<Course> foundCourse = courseService.getCourseById(courseId);

        if (foundCourse.isPresent()) {
            return new ResponseEntity<>(foundCourse.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a course by ID
    @DeleteMapping(path = "/courses/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable("courseId") String courseId) {
        boolean deleted = courseService.deleteCourse(courseId);

        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update a course (partial update)
    @PatchMapping(path = "/courses/{courseId}")
    public ResponseEntity<Course> patchCourse(
            @PathVariable("courseId") String courseId,
            @RequestBody Course partialCourse) {

        try {
            Course updatedCourse = courseService.updateCourse(courseId, partialCourse);
            return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    }

    // Publish a course
    @PatchMapping(path = "/courses/{courseId}/publish")
    public ResponseEntity<Course> publishCourse(@PathVariable("courseId") String courseId) {
        Optional<Course> foundCourse = courseService.getCourseById(courseId);

        if (foundCourse.isPresent()) {
            Course courseToPublish = foundCourse.get();
            courseToPublish.setPublished(true);
            courseToPublish.setUpdatedAt(LocalDateTime.now());

            // Save the updated course
            Course updatedCourse = courseService.saveCourse(courseToPublish);
            return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get all published courses
    @GetMapping(path = "/courses/published")
    public ResponseEntity<List<Course>> getPublishedCourses() {
        List<Course> publishedCourses = courseService.getPublishedCourses();
        return new ResponseEntity<>(publishedCourses, HttpStatus.OK);
    }
}
