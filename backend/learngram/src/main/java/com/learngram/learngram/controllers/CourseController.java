package com.learngram.learngram.controllers;

import com.learngram.learngram.domain.Course;
import com.learngram.learngram.services.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // Handle Course Creation with File Uploads
    @PostMapping
    public ResponseEntity<Course> createCourse(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String createdBy,
            @RequestParam(required = false) List<String> contentTexts,
            @RequestParam(required = false) List<MultipartFile> contentFiles
    ) throws IOException {
        List<String> combinedContent = new ArrayList<>();

        // Add text content to list
        if (contentTexts != null) {
            combinedContent.addAll(contentTexts);
        }

        // Handle files and store them (example storing in a local folder)
        if (contentFiles != null) {
            for (MultipartFile file : contentFiles) {
                // Define the path where the file will be saved
                String filePath = "/path/to/upload/directory/" + file.getOriginalFilename();
                File fileToSave = new File(filePath);
                file.transferTo(fileToSave);
                
                // Add the file path to content (could also store URL if using a server like AWS S3)
                combinedContent.add(filePath);
            }
        }

        // Create the course object
        Course course = Course.builder()
                .title(title)
                .description(description)
                .createdBy(createdBy)
                .content(combinedContent)
                .build();

        // Save the course
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
