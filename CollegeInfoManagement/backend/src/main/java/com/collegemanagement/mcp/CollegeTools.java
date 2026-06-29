package com.collegemanagement.mcp;

import com.collegemanagement.model.College;
import com.collegemanagement.repository.CollegeRepository;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class CollegeTools {

    private final CollegeRepository collegeRepository;

    public CollegeTools(CollegeRepository collegeRepository) {
        this.collegeRepository = collegeRepository;
    }

    @Tool(description = "Returns total number of colleges")
    public String getTotalColleges() {

        long count = collegeRepository.count();

        return "Total Colleges : " + count;
    }

    @Tool(description = "Returns all college names")
    public String getCollegeList() {

        List<College> colleges = collegeRepository.findAll();

        StringBuilder result = new StringBuilder();

        result.append("Available Colleges\n\n");

        for (College college : colleges) {

            result.append("• ")
                    .append(college.getName())
                    .append("\n");
        }

        return result.toString();
    }

    @Tool(description = "Returns highest rated college")
    public String getHighestRatedCollege() {

        List<College> colleges = collegeRepository.findAll();

        College top = colleges.stream()
                .max(Comparator.comparingDouble(College::getRating))
                .orElse(null);

        if (top == null) {
            return "No colleges found.";
        }

        return """
College : %s
Rating : %.1f
Ranking : %d
City : %s
State : %s
"""
        .formatted(
                top.getName(),
                top.getRating(),
                top.getRanking(),
                top.getCity(),
                top.getState()
        );
    }

    @Tool(description = "Returns college having lowest fees")
    public String getLowestFeesCollege() {

        List<College> colleges = collegeRepository.findAll();

        College lowest = colleges.stream()
                .min(Comparator.comparingDouble(College::getFees))
                .orElse(null);

        if (lowest == null) {
            return "No colleges found.";
        }

        return lowest.getName()
                + "\nFees : "
                + lowest.getFees();
    }

    @Tool(description = "Returns college having highest fees")
    public String getHighestFeesCollege() {

        List<College> colleges = collegeRepository.findAll();

        College highest = colleges.stream()
                .max(Comparator.comparingDouble(College::getFees))
                .orElse(null);

        if (highest == null) {
            return "No colleges found.";
        }

        return highest.getName()
                + "\nFees : "
                + highest.getFees();
    }

}