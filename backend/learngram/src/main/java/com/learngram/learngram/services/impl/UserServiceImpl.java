package com.learngram.learngram.services.impl;

import com.learngram.learngram.domain.User;
import com.learngram.learngram.repositories.UserRepo;
import com.learngram.learngram.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public User saveUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User getUserById(String id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public User updateUser(String id, User updatedUser) {
        Optional<User> optionalUser = userRepo.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setImageUrl(updatedUser.getImageUrl());
            existingUser.setPassword(updatedUser.getPassword());
            return userRepo.save(existingUser);
        }
        return null;
    }

    @Override
    public void deleteUser(String id) {
        userRepo.deleteById(id);
    }

    @Override
public void followUser(String userId, String followerId) {
    User user = getUserById(userId);
    if (user.getFollowers() == null) {
        user.setFollowers(new ArrayList<>());
    }
    if (!user.getFollowers().contains(followerId)) {
        user.getFollowers().add(followerId);
        saveUser(user);
    }
}

@Override
public void unfollowUser(String userId, String followerId) {
    User user = getUserById(userId);
    if (user.getFollowers() != null && user.getFollowers().contains(followerId)) {
        user.getFollowers().remove(followerId);
        saveUser(user);
    }
}

@Override
public List<User> getFollowers(String userId) {
    User user = getUserById(userId);
    if (user.getFollowers() == null) {
        return new ArrayList<>();
    }

    return user.getFollowers().stream()
            .map(this::getUserById)
            .collect(Collectors.toList());
}

}
