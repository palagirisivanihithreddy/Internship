package com.collegemanagement.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class McpService {

    private final RestTemplate restTemplate =
            new RestTemplate();

    // TOTAL COLLEGES
    public String getTotalColleges() {

        Map response =
                restTemplate.getForObject(
                        "http://localhost:8000/total-colleges",
                        Map.class
                );

        return "Total Colleges : " +
                response.get("count");
    }

    // LIST COLLEGES
    public String getCollegeList() {

        List response =
                restTemplate.getForObject(
                        "http://localhost:8000/list-colleges",
                        List.class
                );

        StringBuilder result =
                new StringBuilder();

        result.append("Available Colleges\n\n");

        for (Object college : response) {

            result.append("• ")
                    .append(college)
                    .append("\n");
        }

        return result.toString();
    }

    // TOP COLLEGE
    public String getTopCollege() {

        Map response =
                restTemplate.getForObject(
                        "http://localhost:8000/top-college",
                        Map.class
                );

        return "Top College : "
                + response.get("name")
                + "\nRating : "
                + response.get("rating");
    }

    // HEALTH STATUS
    public String getHealthStatus() {

        try {

            Map response =
                    restTemplate.getForObject(
                            "http://localhost:8000/health",
                            Map.class
                    );

            return "MCP Status : "
                    + response.get("status");

        } catch (Exception e) {

            return "MCP Server Not Running";
        }
    }

    // TOTAL STUDENTS
    public String getStudentsCount() {

        try {

            Map response =
                    restTemplate.getForObject(
                            "http://localhost:8000/total-students",
                            Map.class
                    );

            return "Total Students : "
                    + response.get("count");

        } catch (Exception e) {

            return "total-students endpoint not found in MCP";
        }
    }

    // TOTAL DEPARTMENTS
    public String getDepartmentsCount() {

        try {

            Map response =
                    restTemplate.getForObject(
                            "http://localhost:8000/total-departments",
                            Map.class
                    );

            return "Total Departments : "
                    + response.get("count");

        } catch (Exception e) {

            return "total-departments endpoint not found in MCP";
        }
    }

    // TOTAL FACULTIES
    public String getFacultiesCount() {

        try {

            Map response =
                    restTemplate.getForObject(
                            "http://localhost:8000/total-faculties",
                            Map.class
                    );

            return "Total Faculties : "
                    + response.get("count");

        } catch (Exception e) {

            return "total-faculties endpoint not found in MCP";
        }
    }

    // HIGHEST FEES COLLEGE
    public String getHighestFeesCollege() {

        try {

            Map response =
                    restTemplate.getForObject(
                            "http://localhost:8000/highest-fees",
                            Map.class
                    );

            return "Highest Fees College : "
                    + response.get("name")
                    + "\nFees : "
                    + response.get("fees");

        } catch (Exception e) {

            return "highest-fees endpoint not found in MCP";
        }
    }

    // LOWEST FEES COLLEGE
    public String getLowestFeesCollege() {

        try {

            Map response =
                    restTemplate.getForObject(
                            "http://localhost:8000/lowest-fees",
                            Map.class
                    );

            return "Lowest Fees College : "
                    + response.get("name")
                    + "\nFees : "
                    + response.get("fees");

        } catch (Exception e) {

            return "lowest-fees endpoint not found in MCP";
        }
    }
}