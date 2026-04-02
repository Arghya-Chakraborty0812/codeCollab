package com.arghya.codeCollabBackend.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.arghya.codeCollabBackend.dto.CodeMessage;

@Controller
public class CodeSyncController {

    @MessageMapping("/code")  //This means that when a message is sent to the "/app/code" endpoint (as defined in WebSocketConfig), this method will be invoked.
    @SendTo("/topic/code")   // This means that the return value of this method will be sent to all subscribers of the "/topic/code" topic. In our case, this will be all users who are in the same room and have subscribed to this topic.
    public CodeMessage syncCode(@Payload CodeMessage message) {
        return message; // broadcast to all users
    }
}