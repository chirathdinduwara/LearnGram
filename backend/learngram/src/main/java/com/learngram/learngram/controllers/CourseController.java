package com.learngram.learngram.controllers;

import com.learngram.learngram.domain.Course;
import com.learngram.learngram.services.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course saved = courseService.saveCourse(course);
        return ResponseEntity.status(201).body(saved);
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/my")
    public List<Course> getMyCourses(@RequestParam String userId) {
        return courseService.getCoursesByUser(userId);
    }

    @GetMapping("/enrolled")
    public List<Course> getEnrolledCourses(@RequestParam String userId) {
        return courseService.getEnrolledCourses(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String id, @RequestParam String userId) {
        boolean deleted = courseService.deleteCourse(id, userId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.status(403).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable String id,
                                               @RequestParam String userId,
                                               @RequestBody Course course) {
        try {
            Course updated = courseService.updateCourse(id, course, userId);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).build();
        }
    }

    @PostMapping("/{id}/enroll")
    public ResponseEntity<Course> enrollInCourse(@PathVariable String id,
                                                 @RequestParam String userId) {
        try {
            Course enrolled = courseService.enrollInCourse(id, userId);
            return ResponseEntity.ok(enrolled);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
