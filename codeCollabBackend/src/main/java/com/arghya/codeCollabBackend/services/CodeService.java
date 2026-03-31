package com.arghya.codeCollabBackend.services;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arghya.codeCollabBackend.dto.CodeRequest;
import com.arghya.codeCollabBackend.dto.RunRequest;
import com.arghya.codeCollabBackend.entities.Room;
import com.arghya.codeCollabBackend.repositories.RoomRepo;
import com.arghya.codeCollabBackend.util.LanguageMapper;

@Service
public class CodeService {

    @Autowired
    Judge0Service judge0Service;

    @Autowired
    private RoomRepo roomRepo;

     public String executeCode(RunRequest runRequest) {
        int languageId = LanguageMapper.getLanguageId(runRequest.getLanguage());
        return judge0Service.runCode(runRequest.getCode(), languageId);
    }

   

    public Room saveCode(CodeRequest request) {
        Room room = roomRepo.findByRoomId(request.getRoomId());

        if (room == null) {
            throw new RuntimeException("Room not found");
        }

        room.setCode(request.getCode());
        room.setLanguage(request.getLanguage());
        room.setUpdatedAt(LocalDate.now());

        return roomRepo.save(room);
    }
    
}
