package com.learngram.learngram.services;

import java.util.List;

import org.springframework.stereotype.Service;

import java.util.Optional;
import com.learngram.learngram.domain.Post;

@Service
public interface PostService {
    
    Post createPost(Post post);

    List<Post> findAll();

    Optional<Post> findOne(String postId);

    boolean delete(String postId);

    Post update(String postId, Post updatedPost);

}
