package com.learngram.learngram.services;

import com.learngram.learngram.domain.User;

import java.util.List;

public interface UserService {

    User getUserByEmail(String email);

    User saveUser(User user);

    List<User> getAllUsers();

    User getUserById(String id);

    User updateUser(String id, User updatedUser);

    void deleteUser(String id);

    void followUser(String userId, String followerId);
    void unfollowUser(String userId, String followerId);
    List<User> getFollowers(String userId);

}
