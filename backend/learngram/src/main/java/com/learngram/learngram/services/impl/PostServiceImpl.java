package com.learngram.learngram.services.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.stereotype.Service;

import com.learngram.learngram.domain.Post;
import com.learngram.learngram.repositories.PostRepo;
import java.util.Optional;
import com.learngram.learngram.services.PostService;

@Service
public class PostServiceImpl implements PostService {

    private PostRepo postRepo;

    public PostServiceImpl(PostRepo postRepo) {
        this.postRepo = postRepo;
    }

    @Override
    public Post createPost(Post post) {
        return postRepo.save(post);
    }

    @Override
    public List<Post> findAll() {
        return StreamSupport.stream(
            postRepo.findAll().spliterator(), false)
            .collect(Collectors.toList());
    }

    @Override
    public Optional<Post> findOne(String postId) {
        return postRepo.findById(postId);
    }

    @Override
    public boolean delete(String postId) {
        if (postRepo.existsById(postId)) {
            postRepo.deleteById(postId);
            return true;
        }
        return false;
    }

    @Override
    public Post update(String postId, Post partialPost) {
        Optional<Post> existingPostOpt = postRepo.findById(postId);
    
        if (existingPostOpt.isPresent()) {
            Post existingPost = existingPostOpt.get();
    
            if (partialPost.getContentUrl() != null) {
                existingPost.setContentUrl(partialPost.getContentUrl());
            }
            if (partialPost.getCaption() != null) {
                existingPost.setCaption(partialPost.getCaption());
            }
            if (partialPost.getUserId() != null) {
                existingPost.setUserId(partialPost.getUserId());
            }
    
            return postRepo.save(existingPost);
        } else {
            throw new RuntimeException("Post not found with ID: " + postId);
        }
    }
    
    
    
}
