package com.arghya.codeCollabBackend.controllers;



import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arghya.codeCollabBackend.services.DockerService;

@RestController
@RequestMapping("/api/v1/run")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React frontend
public class CodeController {

    @Autowired
    private DockerService dockerService;

    @PostMapping
    public String run(@RequestBody Map<String, String> body) throws Exception {

        return dockerService.runCode(
                body.get("code"),
                body.get("language"),
                body.getOrDefault("input", "")
        );
    }
}