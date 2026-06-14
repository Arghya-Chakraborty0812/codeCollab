package com.arghya.codeCollabBackend.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "rooms")
@Data
@Getter
@Setter
public class Room {
    @Id
    private String id;      //mongoDb Id
    private String roomId;  //custom room id
    private String language;
    private String code;
    private String input;
    private List<String> members = new ArrayList<>();
    private LocalDate createdAt = LocalDate.now();
    private LocalDate updatedAt = LocalDate.now();
}
