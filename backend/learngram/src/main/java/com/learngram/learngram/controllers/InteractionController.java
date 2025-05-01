package com.learngram.learngram.controllers;

import com.learngram.learngram.domain.Interaction;

import com.learngram.learngram.services.impl.InteractionServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
