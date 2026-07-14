package com.arghya.codeCollabBackend.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.arghya.codeCollabBackend.entities.User;

public interface UserRepo extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}
