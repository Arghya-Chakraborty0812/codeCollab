package com.arghya.codeCollabBackend.services;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.arghya.codeCollabBackend.config.LanguageConfig;

@Service
public class DockerService {

    public String runCode(String code, String language, String input) throws Exception {

        language = language.toLowerCase().trim();

        // 1. Get extension
        String extension = LanguageConfig.EXTENSIONS.get(language);
        if (extension == null) return "Unsupported language";

        // 2. Create temp file
        Path tempFile = Files.createTempFile("code", extension);
        Files.write(tempFile, code.getBytes());

        // 3. Get command
        String[] command = LanguageConfig.getCommand(language);
        if (command == null) return "Unsupported language";

        // 4. Docker command
        List<String> dockerCmd = new ArrayList<>();

        dockerCmd.add("docker");
        dockerCmd.add("run");
        dockerCmd.add("-i"); // 🔥 VERY IMPORTANT (stdin support)
        dockerCmd.add("--rm");
        dockerCmd.add("--memory=100m");
        dockerCmd.add("--cpus=0.5");
        dockerCmd.add("--network=none");

        dockerCmd.add("-v");
        dockerCmd.add(tempFile.toAbsolutePath() + ":/app/code" + extension);

        dockerCmd.add("code-runner");

        dockerCmd.addAll(Arrays.asList(command));

        ProcessBuilder pb = new ProcessBuilder(dockerCmd);
        Process process = pb.start();

        // 🔥 SEND INPUT TO CONTAINER
        BufferedWriter writer = new BufferedWriter(
                new OutputStreamWriter(process.getOutputStream())
        );

        if (input != null && !input.isEmpty()) {
            writer.write(input);
        }
        writer.flush();
        writer.close();

        // READ OUTPUT
        BufferedReader output = new BufferedReader(
                new InputStreamReader(process.getInputStream())
        );

        BufferedReader error = new BufferedReader(
                new InputStreamReader(process.getErrorStream())
        );

        String result = output.lines().collect(Collectors.joining("\n"));
        String err = error.lines().collect(Collectors.joining("\n"));

        process.waitFor(5, TimeUnit.SECONDS);
        process.destroy();

        Files.deleteIfExists(tempFile);

        return "OUTPUT:\n" + result + "\nERROR:\n" + err;
    }
}