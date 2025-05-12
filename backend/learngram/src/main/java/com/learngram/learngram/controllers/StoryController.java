package com.learngram.learngram.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.learngram.learngram.domain.Story;
import com.learngram.learngram.services.StoryService;

@RestController
public class StoryControllr {

    private final StoryService storyService;

    @Autowired
    private Cloudinary cloudinary;

    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    @PostMapping("/story/image")
    public ResponseEntity<String> uploadStoryImage(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file selected to upload.");
        }

        try {
            var uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String fileUrl = (String) uploadResult.get("url");
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload image: " + e.getMessage());
        }
    }

    @PostMapping("/stories")
    public ResponseEntity<Story> createStory(@RequestBody Story story) {
        Story savedStory = storyService.createStory(story);
        return new ResponseEntity<>(savedStory, HttpStatus.CREATED);
    }

    @GetMapping("/stories")
    public List<Story> listStories() {
        return storyService.findAll();
    }

    @GetMapping("/stories/{storyId}")
    public ResponseEntity<Story> getStory(@PathVariable("storyId") String storyId) {
        Optional<Story> foundStory = storyService.findOne(storyId);

        return foundStory.map(story -> new ResponseEntity<>(story, HttpStatus.OK))
                         .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/stories/{storyId}")
    public ResponseEntity<Void> deleteStory(@PathVariable("storyId") String storyId) {
        boolean deleted = storyService.delete(storyId);

        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/stories/{storyId}")
    public ResponseEntity<Story> patchStory(
            @PathVariable("storyId") String storyId,
            @RequestBody Story partialStory) {
        try {
            Story updatedStory = storyService.update(storyId, partialStory);
            return new ResponseEntity<>(updatedStory, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
