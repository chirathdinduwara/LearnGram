package com.learngram.learngram.repositories;

import com.learngram.learngram.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface UserRepo extends MongoRepository<User, String> {
    User findByEmail(String email);
}
