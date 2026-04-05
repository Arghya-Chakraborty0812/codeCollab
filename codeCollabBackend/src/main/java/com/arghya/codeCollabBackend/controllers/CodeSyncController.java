package com.arghya.codeCollabBackend.controllers;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arghya.codeCollabBackend.dto.CodeMessage;

@Controller
@RestController // ✅ needed for GET API
@RequestMapping("/api/v1/code")
public class CodeSyncController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // ✅ STORE CODE PER ROOM
    private final ConcurrentHashMap<String, String> roomCodeMap = new ConcurrentHashMap<>();

    // 🔥 REAL-TIME SYNC
    @MessageMapping("/code")
    public void syncCode(CodeMessage message) {

        System.out.println("Received: " + message.getCode());

        // ✅ SAVE CODE
        roomCodeMap.put(message.getRoomId(), message.getCode());

        // ✅ BROADCAST
        messagingTemplate.convertAndSend(
            "/topic/code/" + message.getRoomId(),
            message
        );
    }

    // 🔥 FETCH CODE ON LOAD
    @GetMapping("/{roomId}")
    public String getCode(@PathVariable String roomId) {
        return roomCodeMap.getOrDefault(roomId, "");
    }
}