package com.learngram.learngram.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.learngram.learngram.domain.Story;

@Repository
public interface StoryRepo extends MongoRepository<Story, String> {
}
