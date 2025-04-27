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
) {
    List<Course.Content> combinedContent = new ArrayList<>();

    // Add text content to list
    if (contentTexts != null) {
        for (String text : contentTexts) {
            combinedContent.add(new Course.Content("text", text));
        }
    }

    // Handle image files and store them (store in backend folder)
    if (contentFiles != null) {
        String uploadDir = "uploads"; // Make sure this is an actual path on the server

        // Create directory if it doesn't exist
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        for (MultipartFile file : contentFiles) {
            if (!file.isEmpty()) {
                // Generate a unique filename to avoid conflicts
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                String filePath = uploadDir + File.separator + fileName; // Use File.separator for cross-platform compatibility
                File fileToSave = new File(filePath);

                try {
                    file.transferTo(fileToSave); // Save the file to disk
                    combinedContent.add(new Course.Content("image", filePath)); // Add the file path
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(500).body(null); // Return error if file transfer fails
                }
            }
        }
    }

    // Create the course object
    Course course = Course.builder()
            .title(title)
            .description(description)
            .createdBy(createdBy)
            .content(combinedContent)
            .build();

    // Save the course to the database
    Course saved = courseService.saveCourse(course);
    return ResponseEntity.status(201).body(saved); // Return the saved course
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
