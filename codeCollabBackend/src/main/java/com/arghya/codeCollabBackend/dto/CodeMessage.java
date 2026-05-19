package com.arghya.codeCollabBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CodeMessage {
    private String roomId;
    private String code;
    private String username;
    private String output;

    private int version;
}

// This DTO (Data Transfer Object) represents the message sent over WebSocket when a user updates the code in a collaborative coding session. It contains the roomId to identify which room the code belongs to, the updated code itself, and the username of the person who made the change.