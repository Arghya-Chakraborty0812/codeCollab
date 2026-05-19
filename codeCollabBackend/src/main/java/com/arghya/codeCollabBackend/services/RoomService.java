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

    public ResponseEntity<?> createRoom(String roomId, String username) {
         // If room already exists, don't allow creating again
         if (roomRepo.existsByRoomId(roomId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Room '" + roomId + "' already exists. Use JOIN instead.");
        }
        Room room = new Room();
        room.setRoomId(roomId);
        room.getMembers().add(username);
        roomRepo.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }

    public ResponseEntity<?> joinRoom(String roomId, String username) {
        Room room = roomRepo.findByRoomId(roomId);

        // Room must exist to join
        if (room == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Room '" + roomId + "' not found. Create it first.");
        }
        if (!room.getMembers().contains(username)) {
            room.getMembers().add(username);
            // room.setUpdatedAt(LocalDateTime.now());
            roomRepo.save(room);
        }

        return ResponseEntity.ok(room);
    }

    public ResponseEntity<?> getRoom(String roomId) {
        Room room = roomRepo.findByRoomId(roomId);
        if (room == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Room '" + roomId + "' not found.");
        }
        return ResponseEntity.ok(room);
    }
    
}