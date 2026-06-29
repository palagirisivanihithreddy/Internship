package com.collegemanagement.controller;

import com.collegemanagement.service.AiChatService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final AiChatService aiChatService;

    public AiController(AiChatService aiChatService) {
        this.aiChatService = aiChatService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody Map<String, String> body) {
        return aiChatService.chat(body.get("question"));
    }

}