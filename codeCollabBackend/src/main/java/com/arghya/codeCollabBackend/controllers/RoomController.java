package com.arghya.codeCollabBackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arghya.codeCollabBackend.dto.CreateRoomRequest;
import com.arghya.codeCollabBackend.services.RoomService;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React frontend
public class RoomController {

    @Autowired
    RoomService roomService;
    
    @PostMapping("/create")
    public ResponseEntity<?> createRoom(@RequestBody CreateRoomRequest req, Authentication auth) {
        return roomService.createRoom(req.getRoomId(), auth.getName());
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinRoom(@RequestBody CreateRoomRequest createRoomRequest, Authentication auth) {
        return roomService.joinRoom(createRoomRequest.getRoomId(), createRoomRequest.getUsername());
    }

    @GetMapping("{roomId}")
    public ResponseEntity<?> getRoomById(@PathVariable String roomId) {
        return roomService.getRoom(roomId);
    }

}