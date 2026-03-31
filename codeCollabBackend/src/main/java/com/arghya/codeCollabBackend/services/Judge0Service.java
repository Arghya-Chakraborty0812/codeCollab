package com.arghya.codeCollabBackend.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class Judge0Service {


    //injects api key from application.properties file
    @Value("${judge0.api.key}")
    private String apiKey;

    //final endpoint for judge0 api
    private final String URL =
            "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

    public String runCode(String code, int languageId) {

        // Create RestTemplate instance for making HTTP requests to Judge0 API
        RestTemplate restTemplate = new RestTemplate();

        // Set up HTTP headers with API key and content type, tells judge0 api that we are sending json data and includes our api key for authentication
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("X-RapidAPI-Key", apiKey);
        headers.set("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com");

        // Escape code properly
        // Judge0 API expects the code to be sent as a JSON string, so we need to escape special characters like quotes and newlines to ensure the JSON is valid.
        String safeCode = code.replace("\"", "\\\"").replace("\n", "\\n");

        // Construct the JSON body for the API request, includes the source code and the language id
        String body = String.format(
                "{\"source_code\":\"%s\",\"language_id\":%d}",
                safeCode,
                languageId
        );

        // Create HttpEntity with headers and body, encapsulates the request data and headers together for the API call
        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        // Make the API call to Judge0 and get the response, sends a POST request to the Judge0 API endpoint with the code and language information, and waits for the response containing the execution results
        ResponseEntity<Map> response = restTemplate.exchange(
                URL,
                HttpMethod.POST,
                entity,
                Map.class
        );

        Map result = response.getBody();

        if (result == null) return "No output";

        return (String) (
                result.get("stdout") != null ? result.get("stdout") :
                result.get("stderr") != null ? result.get("stderr") :
                result.get("compile_output") != null ? result.get("compile_output") :
                "No output"
        );
    }
}