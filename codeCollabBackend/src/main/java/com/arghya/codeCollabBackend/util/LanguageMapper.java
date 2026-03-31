package com.arghya.codeCollabBackend.util;

import lombok.Data;

@Data
public class LanguageMapper {
    public static int getLanguageId(String lang) {
        switch (lang) {
            case "C++": return 54;
            case "Python": return 71;
            case "Java": return 62;
            case "JavaScript": return 63;
            case "C": return 50;
            case "Go": return 60;
            case "Rust": return 73;
            default: return 54;
        }
    }
}
