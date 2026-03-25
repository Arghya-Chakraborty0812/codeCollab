package com.arghya.codeCollabBackend.dto;

import lombok.Data;

@Data
public class CreateRoomRequest {
    private String roomId;
    private String username;
}
