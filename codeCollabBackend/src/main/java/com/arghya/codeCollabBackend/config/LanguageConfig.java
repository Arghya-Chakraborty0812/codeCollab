package com.arghya.codeCollabBackend.config;

import java.util.Map;

public class LanguageConfig {

    public static final Map<String, String> EXTENSIONS = Map.of(
            "python", ".py",
            "cpp", ".cpp",
            "java", ".java",
            "javascript", ".js"
    );

    public static String[] getCommand(String language) {

        return switch (language) {

            case "python" -> new String[]{
                    "python3", "/app/code.py"
            };

            case "cpp" -> new String[]{
                    "bash", "-c",
                    "g++ /app/code.cpp -o /app/main && /app/main"
            };

            case "java" -> new String[]{
                    "bash", "-c",
                    "javac /app/Main.java && java -cp /app Main"
            };

            case "javascript" -> new String[]{
                    "node", "/app/code.js"
            };

            default -> null;
        };
    }
}