package com.learngram.learngram.services.impl;

import com.learngram.learngram.domain.Interaction;
import com.learngram.learngram.domain.Like;
import com.learngram.learngram.repositories.InteractionRepo;
import com.learngram.learngram.services.InteractionServices;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

    @Override
public void addLike(String postId, String userEmail) {
    List<Interaction> interactions = interactionRepo.findByPostId(postId);

    Interaction interaction;

    if (interactions.isEmpty()) {
        interaction = new Interaction();
        interaction.setPostId(postId);
        interaction.setLikes(new ArrayList<>());
    } else {
        interaction = interactions.get(0);
        if (interaction.getLikes() == null) {
            interaction.setLikes(new ArrayList<>());
        }
    }

    // Check if like exists
    boolean updated = false;
    for (Like like : interaction.getLikes()) {
        if (like.getUserEmail().equalsIgnoreCase(userEmail)) {
            like.setLiked(true); // Update existing like to true
            updated = true;
            break;
        }
    }

    // If not found, add new like
    if (!updated) {
        interaction.getLikes().add(new Like(userEmail, true));
    }

    // Save regardless of new or updated
    System.out.println("Saving interaction: " + interaction);
interactionRepo.save(interaction);

    
}


    @Override
public void removeLike(String postId, String userEmail) {
    List<Interaction> interactions = interactionRepo.findByPostId(postId);
    if (interactions.isEmpty()) return;

    Interaction interaction = interactions.get(0);
    if (interaction.getLikes() != null) {
        // Use iterator to safely remove while looping
        Iterator<Like> iterator = interaction.getLikes().iterator();
        while (iterator.hasNext()) {
            Like like = iterator.next();
            if (like.getUserEmail().equalsIgnoreCase(userEmail)) {
                iterator.remove(); // physically remove the Like from the list
                break;
            }
        }
        interactionRepo.save(interaction);
    }
}


@Override
public int getLikeCount(String postId) {
    // Fetch interactions for the postId
    List<Interaction> interactions = interactionRepo.findByPostId(postId);

    // If no interactions exist for the post, return 0 likes
    if (interactions.isEmpty()) {
        return 0;
    }

    // Get the first interaction (assuming each post has only one interaction record)
    Interaction interaction = interactions.get(0);

    // If likes are null, return 0, else return the length of the likes list
    if (interaction.getLikes() == null) {
        return 0;
    }

    // Return the length of the likes list
    return interaction.getLikes().size();
}



    @Override
public boolean isLiked(String postId, String userEmail) {
    List<Interaction> interactions = interactionRepo.findByPostId(postId);

    if (interactions.isEmpty()) {
        return false;
    }

    Interaction interaction = interactions.get(0);
    List<Like> likes = interaction.getLikes();

    if (likes == null) {
        return false;
    }

    // Check if the user has liked this post and `liked == true`
    return likes.stream()
            .anyMatch(like -> userEmail.equalsIgnoreCase(like.getUserEmail()) && like.isLiked());
}





}
