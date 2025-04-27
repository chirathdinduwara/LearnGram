package com.learngram.learngram.controllers;

import com.learngram.learngram.domain.Course;
import com.learngram.learngram.services.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController 
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course created = courseService.createCourse(course);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/user/{userId}")
    public List<Course> getCoursesByUser(@PathVariable String userId) {
        return courseService.getCoursesByUser(userId);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<Course> getCourseById(@PathVariable String courseId) {
        Optional<Course> course = courseService.getCourseById(courseId);
        return course.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PatchMapping("/{courseId}")
    public ResponseEntity<Course> updateCourse(@PathVariable String courseId, @RequestBody Course course) {
        try {
            Course updated = courseService.updateCourse(courseId, course);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String courseId) {
        boolean deleted = courseService.deleteCourse(courseId);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                       : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{courseId}/enroll/{userId}")
    public ResponseEntity<Course> enrollInCourse(@PathVariable String courseId, @PathVariable String userId) {
        try {
            Course enrolledCourse = courseService.enrollInCourse(courseId, userId);
            return new ResponseEntity<>(enrolledCourse, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
