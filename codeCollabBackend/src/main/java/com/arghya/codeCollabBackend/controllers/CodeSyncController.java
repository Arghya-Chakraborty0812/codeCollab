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
    private final ConcurrentHashMap<String, CodeMessage> roomStateMap = new ConcurrentHashMap<>();

    // 🔥 REAL-TIME SYNC
    @MessageMapping("/code")
public void syncCode(CodeMessage message) {

    String roomId = message.getRoomId();

    CodeMessage current = roomStateMap.get(roomId);

    // ✅ If no data exists → accept
    if (current == null || message.getVersion() > current.getVersion()) {

        // ✅ Save latest
        roomStateMap.put(roomId, message);

        // ✅ Broadcast
        messagingTemplate.convertAndSend(
            "/topic/code/" + roomId,
            message
        );
    }
    // ❌ Ignore older updates
}

    // 🔥 FETCH CODE ON LOAD
    @GetMapping("/{roomId}")
    public CodeMessage getCode(@PathVariable String roomId) {
        return roomStateMap.getOrDefault(
            roomId,
            new CodeMessage(roomId, "", "", "", 0)
        );
    }
}