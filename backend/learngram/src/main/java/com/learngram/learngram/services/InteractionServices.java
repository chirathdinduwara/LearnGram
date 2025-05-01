package com.learngram.learngram.services;

import com.learngram.learngram.domain.Interaction;

import java.util.List;
import java.util.Optional;

public interface InteractionServices {

    // Create a new comment
    Interaction createComment(Interaction interaction);

    // Get all comments by postId
    List<Interaction> getCommentsByPostId(String postId);

    // Get a comment by its ID
    Optional<Interaction> getCommentById(String id);

    // Update a comment
    Interaction updateComment(String id, String newComment);

    // Delete a comment
    void deleteComment(String id);

}
