package com.learngram.learngram.repositories;

import com.learngram.learngram.domain.Interaction;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;



public interface InteractionRepo extends MongoRepository<Interaction, String> {
    List<Interaction> findByPostId(String postId);
}
