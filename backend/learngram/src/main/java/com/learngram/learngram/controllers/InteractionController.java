package com.learngram.learngram.controllers;

import com.learngram.learngram.domain.Interaction;

import com.learngram.learngram.services.impl.InteractionServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/interactions")
public class InteractionController {

    @Autowired
    private InteractionServiceImpl interactionService;

    @PostMapping("/post")
    public Interaction createComment(@RequestBody Interaction interaction) {
        return interactionService.createComment(interaction);
    }

    @GetMapping("/post/{postId}")
    public List<Interaction> getCommentsByPostId(@PathVariable String postId) {
        return interactionService.getCommentsByPostId(postId);
    }

    @GetMapping("/{id}")
    public Optional<Interaction> getCommentById(@PathVariable String id) {
        return interactionService.getCommentById(id);
    }

    @PatchMapping("/{id}")
    public Interaction updateComment(@PathVariable String id, @RequestBody Map<String, String> payload) {
        String newComment = payload.get("comment");
        return interactionService.updateComment(id, newComment);
    }
    

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable String id) {
        interactionService.deleteComment(id);
    }

    @PostMapping("/{postId}/like")
    public void likePost(@PathVariable String postId, @RequestParam String userEmail) {
        interactionService.addLike(postId, userEmail);
    }

    @DeleteMapping("/{postId}/like")
    public void unlikePost(@PathVariable String postId, @RequestParam String userEmail) {
        interactionService.removeLike(postId, userEmail);
    }

    @GetMapping("/likeCount")
    public ResponseEntity<Map<String, Integer>> getLikeCount(@RequestParam String postId) {
    int count = interactionService.getLikeCount(postId);
    Map<String, Integer> response = new HashMap<>();
    response.put("likeCount", count);
    return ResponseEntity.ok(response);
}

    @GetMapping("/isLiked")
public ResponseEntity<Map<String, Boolean>> isLiked(
        @RequestParam String postId,
        @RequestParam String userEmail) {
    boolean liked = interactionService.isLiked(postId, userEmail);
    return ResponseEntity.ok(Collections.singletonMap("liked", liked));
}
}

