package com.arghya.codeCollabBackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arghya.codeCollabBackend.dto.CreateRoomRequest;
import com.arghya.codeCollabBackend.services.RoomService;

@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {

    @Autowired
    RoomService roomService;
    
    @PostMapping("/create")
    public ResponseEntity<?> createRoom(@RequestBody CreateRoomRequest createRoomRequest) {
        return roomService.createRoom(createRoomRequest.getRoomId(), createRoomRequest.getUsername());
    }

    @PostMapping("/join")
    public ResponseEntity<?> getRoom(@RequestBody CreateRoomRequest createRoomRequest) {
        return roomService.getRoom(createRoomRequest.getRoomId(), createRoomRequest.getUsername());
    }

}
