package com.arghya.codeCollabBackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import com.arghya.codeCollabBackend.dto.CodeRequest;
import com.arghya.codeCollabBackend.dto.RunRequest;
import com.arghya.codeCollabBackend.entities.Room;
import com.arghya.codeCollabBackend.services.CodeService;

@Controller
@RequestMapping("/api/v1/code")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React frontend
public class CodeController {

    @Autowired
    CodeService codeService;

    @PostMapping("/run")
    public ResponseEntity<?> runCode(@RequestBody RunRequest runRequest) {
       try {
            
            String output = codeService.executeCode(runRequest);
            return ResponseEntity.ok(output);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error executing code: " + e.getMessage());
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveCode(@RequestBody CodeRequest request) {
        try {
            Room room = codeService.saveCode(request);
            return ResponseEntity.ok(room);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
