package com.arghya.codeCollabBackend.dto;

import lombok.Data;

@Data
public class CodeRequest {
    private String roomId;
    private String code;
    private String language;
}
