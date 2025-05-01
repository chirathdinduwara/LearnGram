package com.learngram.learngram.services.impl;

import com.learngram.learngram.domain.Interaction;
import com.learngram.learngram.repositories.InteractionRepo;
import com.learngram.learngram.services.InteractionServices;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InteractionServiceImpl implements InteractionServices {

    private final InteractionRepo interactionRepo;

    public InteractionServiceImpl(InteractionRepo interactionRepo) {
        this.interactionRepo = interactionRepo;
    }

    // Create a new comment
    @Override
    public Interaction createComment(Interaction interaction) {
        return interactionRepo.save(interaction);
    }

    // Get all comments by postId
    @Override
    public List<Interaction> getCommentsByPostId(String postId) {
        return interactionRepo.findByPostId(postId);  
    }
    

   
    @Override
    public Optional<Interaction> getCommentById(String id) {
        return interactionRepo.findById(id);
    }

    
    @Override
    public Interaction updateComment(String id, String newComment) {
        Optional<Interaction> existingInteraction = interactionRepo.findById(id);
        if (existingInteraction.isPresent()) {
            Interaction interaction = existingInteraction.get();
            interaction.setComment(newComment); 
            return interactionRepo.save(interaction); 
        }
        return null; 
    }

    
    @Override
    public void deleteComment(String id) {
        interactionRepo.deleteById(id);
    }


}
