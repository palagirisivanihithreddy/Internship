package com.collegemanagement.controller;

import com.collegemanagement.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/chat")
    public String chat(
            @RequestBody Map<String,String> body
    ) {

        String question =
                body.get("question");

        return aiService.ask(question);
    }
}