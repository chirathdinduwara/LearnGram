package com.learngram.learngram.services.impl;

import com.learngram.learngram.domain.User;
import com.learngram.learngram.repositories.UserRepo;
import com.learngram.learngram.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}
