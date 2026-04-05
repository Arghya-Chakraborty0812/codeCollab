package com.arghya.codeCollabBackend.controllers;



import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arghya.codeCollabBackend.dto.CodeMessage;
import com.arghya.codeCollabBackend.services.DockerService;

@RestController
@RequestMapping("/api/v1/run")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React frontend
public class CodeController {

    @Autowired
    private DockerService dockerService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public String run(@RequestBody Map<String, String> body) throws Exception {

        String code = body.get("code");
        String language = body.get("language");
        String input = body.getOrDefault("input", "");
        String roomId = body.get("roomId"); // 🔥 REQUIRED

        String result = dockerService.runCode(code, language, input);

        // 🔥 BROADCAST OUTPUT TO ROOM
        CodeMessage msg = new CodeMessage();
        msg.setRoomId(roomId);
        msg.setOutput(result);

        messagingTemplate.convertAndSend(
            "/topic/output/" + roomId,
            msg
        );

        return result;
    }
}