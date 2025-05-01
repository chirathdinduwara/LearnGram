package com.learngram.learngram.services;

import java.util.List;
import java.util.Optional;
import com.learngram.learngram.domain.Story;

public interface StoryService {

    Story createStory(Story story);

    List<Story> findAll();

    Optional<Story> findOne(String storyId);

    boolean delete(String storyId);

    Story update(String storyId, Story updatedStory);
}
