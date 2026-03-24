package com.arghya.codeCollabBackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.arghya.codeCollabBackend.entities.Room;
import com.arghya.codeCollabBackend.repositories.RoomRepo;

@Service
public class RoomService {

    @Autowired
    RoomRepo roomRepo;

    public ResponseEntity<?> createRoom(String roomId) {
        if(roomRepo.findByRoomId(roomId) != null) {
            return ResponseEntity.status(400).body("Room already exists");
        }
        Room room = new Room();
        room.setRoomId(roomId);
        roomRepo.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }

    public ResponseEntity<?> getRoom(String roomId) {
        Room room = roomRepo.findByRoomId(roomId);
        if(roomRepo.findByRoomId(roomId) == null) {
            return ResponseEntity.status(404).body("Room not found");
        }
        return ResponseEntity.ok(room);
    }
    
}
