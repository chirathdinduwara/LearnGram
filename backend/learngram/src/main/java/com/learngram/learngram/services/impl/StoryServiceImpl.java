package com.learngram.learngram.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.stereotype.Service;

import com.learngram.learngram.domain.Story;
import com.learngram.learngram.repositories.StoryRepo;
import com.learngram.learngram.services.StoryService;

@Servic
public class StoryServiceImpl implements StoryService {

    private final StoryRepo storyRepo;

    public StoryServiceImpl(StoryRepo storyRepo) {
        this.storyRepo = storyRepo;
    }

    @Override
    public Story createStory(Story story) {
        return storyRepo.save(story);
    }

    @Override
    public List<Story> findAll() {
        return StreamSupport.stream(storyRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Story> findOne(String storyId) {
        return storyRepo.findById(storyId);
    }

    @Override
    public boolean delete(String storyId) {
        if (storyRepo.existsById(storyId)) {
            storyRepo.deleteById(storyId);
            return true;
        }
        return false;
    }

    @Override
    public Story update(String storyId, Story updatedStory) {
        Optional<Story> existingStoryOpt = storyRepo.findById(storyId);

        if (existingStoryOpt.isPresent()) {
            Story existingStory = existingStoryOpt.get();

            if (updatedStory.getContentUrl() != null) {
                existingStory.setContentUrl(updatedStory.getContentUrl());
            }
            if (updatedStory.getCaption() != null) {
                existingStory.setCaption(updatedStory.getCaption());
            }
            if (updatedStory.getUserId() != null) {
                existingStory.setUserId(updatedStory.getUserId());
            }
            if (updatedStory.getLocation() != null) {
                existingStory.setLocation(updatedStory.getLocation());
            }

            return storyRepo.save(existingStory);
        } else {
            throw new RuntimeException("Story not found with ID: " + storyId);
        }
    }
}
