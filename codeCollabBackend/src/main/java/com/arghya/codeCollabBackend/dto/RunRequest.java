package com.arghya.codeCollabBackend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class RunRequest {
    private String code;
    private String language;
}
