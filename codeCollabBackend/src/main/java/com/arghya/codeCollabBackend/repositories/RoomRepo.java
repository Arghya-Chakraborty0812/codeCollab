package com.arghya.codeCollabBackend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.arghya.codeCollabBackend.entities.Room;

public interface RoomRepo extends MongoRepository<Room, String>{
    Room findByRoomId(String roomId);
    boolean existsByRoomId(String roomId);
}
