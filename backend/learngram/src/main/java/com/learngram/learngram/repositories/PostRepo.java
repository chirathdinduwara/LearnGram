package com.learngram.learngram.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.learngram.learngram.domain.Post;

@Repository
public interface PostRepo extends MongoRepository<Post, String> {
}
