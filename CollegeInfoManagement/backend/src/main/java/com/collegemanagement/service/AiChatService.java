package com.collegemanagement.service;

import com.collegemanagement.mcp.CollegeTools;
import com.collegemanagement.mcp.DepartmentTools;
import com.collegemanagement.mcp.FacultyTools;
import com.collegemanagement.mcp.StudentTools;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiChatService {

    private final ChatClient chatClient;

    public AiChatService(
            ChatClient.Builder builder,
            CollegeTools collegeTools,
            StudentTools studentTools,
            DepartmentTools departmentTools,
            FacultyTools facultyTools
    ) {

        this.chatClient = builder
                .defaultTools(
                        collegeTools,
                        studentTools,
                        departmentTools,
                        facultyTools
                )
                .build();
    }

    public String chat(String question) {

        return chatClient.prompt()

                .system("""
You are College AI Assistant.

You have access to Java tools connected to a MongoDB database.

Follow these rules carefully:

1. Use the available tools ONLY when the user asks about:
   - Colleges
   - Students
   - Departments
   - Faculties
   - Fees
   - Ratings
   - Rankings
   - Placements
   - College statistics
   - Any information stored in the college database

2. If the question is NOT related to the college database, DO NOT call any tool.

3. For general questions like:
   - Java
   - Spring Boot
   - Python
   - Artificial Intelligence
   - Machine Learning
   - Data Structures
   - Programming
   - Databases
   - History
   - Science
   - Mathematics
   - Geography
   - General Knowledge

Answer directly using your own knowledge.

4. Never say you cannot answer a general question just because no tool exists.

5. Only use tools when database information is required.

Always provide a professional, clear and helpful answer.
""")

                .user(question)

                .call()

                .content();
    }
}