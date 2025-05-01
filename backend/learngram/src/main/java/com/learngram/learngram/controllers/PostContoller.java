package com.learngram.learngram.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.learngram.learngram.domain.Post;
import com.learngram.learngram.services.PostService;


import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
public class PostContoller {


    private PostService postService;

    @Autowired
    private Cloudinary cloudinary;

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file selected to upload.");
        }

        try {
            // Upload image to Cloudinary
            var uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

            // Get the URL of the uploaded image
            String fileUrl = (String) uploadResult.get("url");

            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload image: " + e.getMessage());
        }
    }

    @PostMapping("/video")
public ResponseEntity<String> uploadVideo(@RequestParam("video") MultipartFile file) {
    if (file.isEmpty()) {
        return ResponseEntity.badRequest().body("No video selected to upload.");
    }

    try {
        // Set resource_type to "video"
        Map<String, Object> options = ObjectUtils.asMap(
            "resource_type", "video"
        );

        var uploadResult = cloudinary.uploader().upload(file.getBytes(), options);

        String videoUrl = (String) uploadResult.get("url");
        return ResponseEntity.ok(videoUrl);
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Failed to upload video: " + e.getMessage());
    }
}





    public PostContoller(PostService postService) {
        this.postService = postService;
    }

    @PostMapping(path = "/posts")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post savedPost = postService.createPost(post);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

    @GetMapping(path = "/posts")
    public List<Post> listPost() {
        List<Post> posts = postService.findAll();
        return posts.stream().toList();
    }

    @GetMapping(path = "/posts/{postId}")
    public ResponseEntity<Post> getPost(@PathVariable("postId") String postId ) {
        Optional<Post> foundPost = postService.findOne(postId);

        if(foundPost.isPresent()) {
            return new ResponseEntity<>(foundPost.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping(path = "/posts/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable("postId") String postId) {
        boolean deleted = postService.delete(postId);

        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 - Deleted successfully, no content to return
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 - Post not found
        }
    }

    @PatchMapping(path = "/posts/{postId}")
        public ResponseEntity<Post> patchPost(
            @PathVariable("postId") String postId,
            @RequestBody Post partialPost) {

        try {
            Post updatedPost = postService.update(postId, partialPost);
            return new ResponseEntity<>(updatedPost, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    
}
