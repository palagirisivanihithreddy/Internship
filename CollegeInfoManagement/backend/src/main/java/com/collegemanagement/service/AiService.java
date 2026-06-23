package com.collegemanagement.service;

import com.collegemanagement.model.*;
import com.collegemanagement.repository.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class AiService {

    @Autowired
    private CollegeRepository collegeRepository;

    @Autowired
    private McpService mcpService;

    @Autowired
    private OllamaService ollamaService;

    public String ask(String question) {

        String originalQuestion = question;

        question = question.toLowerCase();

        List<College> colleges =
                collegeRepository.findAll();

        // =========================
        // MCP FEATURES
        // =========================

        if (question.contains("how many colleges")) {
            return mcpService.getTotalColleges();
        }

        if (question.contains("list colleges")
                || question.contains("show colleges")) {
            return mcpService.getCollegeList();
        }

        if (question.contains("top college")
                || question.contains("best college")) {
            return mcpService.getTopCollege();
        }

        // =========================
        // TOTAL STUDENTS
        // =========================

        if (question.contains("how many students")) {

            int totalStudents = 0;

            for (College college : colleges) {

                if (college.getStudents() != null) {

                    totalStudents +=
                            college.getStudents().size();
                }
            }

            return "Total Students : "
                    + totalStudents;
        }

        // =========================
        // SHOW STUDENTS
        // =========================

        if (question.contains("show students")
                || question.contains("list students")) {

            StringBuilder result =
                    new StringBuilder();

            result.append("Students:\n\n");

            for (College college : colleges) {

                if (college.getStudents() != null) {

                    for (Student student :
                            college.getStudents()) {

                        result.append(
                                student.getStudentName()
                        )
                        .append(" (")
                        .append(college.getName())
                        .append(")\n");
                    }
                }
            }

            return result.toString();
        }

        // =========================
        // TOTAL DEPARTMENTS
        // =========================

        if (question.contains("how many departments")) {

            int totalDepartments = 0;

            for (College college : colleges) {

                if (college.getDepartments() != null) {

                    totalDepartments +=
                            college.getDepartments().size();
                }
            }

            return "Total Departments : "
                    + totalDepartments;
        }

        // =========================
        // SHOW DEPARTMENTS
        // =========================

        if (question.contains("show departments")
                || question.contains("list departments")) {

            StringBuilder result =
                    new StringBuilder();

            result.append("Departments:\n\n");

            for (College college : colleges) {

                if (college.getDepartments() != null) {

                    for (Department department :
                            college.getDepartments()) {

                        result.append(
                                department.getDepartmentName()
                        )
                        .append(" - ")
                        .append(college.getName())
                        .append("\n");
                    }
                }
            }

            return result.toString();
        }

        // =========================
        // TOTAL FACULTIES
        // =========================

        if (question.contains("how many faculties")
                || question.contains("how many faculty")) {

            int totalFaculties = 0;

            for (College college : colleges) {

                if (college.getFaculties() != null) {

                    totalFaculties +=
                            college.getFaculties().size();
                }
            }

            return "Total Faculties : "
                    + totalFaculties;
        }

        // =========================
        // SHOW FACULTIES
        // =========================

        if (question.contains("show faculties")
                || question.contains("list faculties")) {

            StringBuilder result =
                    new StringBuilder();

            result.append("Faculties:\n\n");

            for (College college : colleges) {

                if (college.getFaculties() != null) {

                    for (Faculty faculty :
                            college.getFaculties()) {

                        result.append(
                                faculty.getFacultyName()
                        )
                        .append(" - ")
                        .append(faculty.getSubject())
                        .append("\n");
                    }
                }
            }

            return result.toString();
        }

        // =========================
        // LOWEST FEES
        // =========================

        if (question.contains("lowest fees")
                || question.contains("cheapest college")) {

            College cheapest =
                    colleges.stream()
                            .min(
                                    Comparator.comparingDouble(
                                            College::getFees
                                    )
                            )
                            .orElse(null);

            if (cheapest != null) {

                return cheapest.getName()
                        + " has lowest fees : "
                        + cheapest.getFees();
            }
        }

        // =========================
        // HIGHEST FEES
        // =========================

        if (question.contains("highest fees")) {

            College expensive =
                    colleges.stream()
                            .max(
                                    Comparator.comparingDouble(
                                            College::getFees
                                    )
                            )
                            .orElse(null);

            if (expensive != null) {

                return expensive.getName()
                        + " has highest fees : "
                        + expensive.getFees();
            }
        }

        // =========================
        // COLLEGE DETAILS
        // =========================

        for (College college : colleges) {

            if (question.contains(
                    college.getName().toLowerCase()
            )) {

                return "College : "
                        + college.getName()
                        + "\nState : "
                        + college.getState()
                        + "\nCity : "
                        + college.getCity()
                        + "\nCourse : "
                        + college.getCourseType()
                        + "\nFees : "
                        + college.getFees()
                        + "\nRating : "
                        + college.getRating()
                        + "\nRanking : "
                        + college.getRanking()
                        + "\nDepartments : "
                        + (college.getDepartments() == null
                        ? 0
                        : college.getDepartments().size())
                        + "\nStudents : "
                        + (college.getStudents() == null
                        ? 0
                        : college.getStudents().size())
                        + "\nFaculties : "
                        + (college.getFaculties() == null
                        ? 0
                        : college.getFaculties().size());
            }
        }

        // =========================
        // OLLAMA AI SECTION
        // =========================

        StringBuilder collegeContext =
                new StringBuilder();

        for (College college : colleges) {

            collegeContext.append("College Name: ")
                    .append(college.getName())
                    .append("\n");

            collegeContext.append("City: ")
                    .append(college.getCity())
                    .append("\n");

            collegeContext.append("State: ")
                    .append(college.getState())
                    .append("\n");

            collegeContext.append("Course: ")
                    .append(college.getCourseType())
                    .append("\n");

            collegeContext.append("Fees: ")
                    .append(college.getFees())
                    .append("\n");

            collegeContext.append("Rating: ")
                    .append(college.getRating())
                    .append("\n");

            collegeContext.append("Ranking: ")
                    .append(college.getRanking())
                    .append("\n\n");
        }

        String prompt = """
You are CollegeHub AI Assistant.

You can answer both:
1. General AI questions.
2. College database questions.

College Data:

%s

User Question:
%s

Give a clean and professional answer.
"""
                .formatted(
                        collegeContext.toString(),
                        originalQuestion
                );

        return ollamaService.askOllama(prompt);
    }
}