package com.collegemanagement.mcp;

import com.collegemanagement.model.College;
import com.collegemanagement.model.Student;
import com.collegemanagement.repository.CollegeRepository;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StudentTools {

    private final CollegeRepository collegeRepository;

    public StudentTools(CollegeRepository collegeRepository) {
        this.collegeRepository = collegeRepository;
    }

    @Tool(description = "Returns total number of students")
    public String getTotalStudents() {

        int total = 0;

        List<College> colleges = collegeRepository.findAll();

        for (College college : colleges) {

            if (college.getStudents() != null) {
                total += college.getStudents().size();
            }
        }

        return "Total Students : " + total;
    }

    @Tool(description = "Returns list of all students")
    public String getAllStudents() {

        List<College> colleges = collegeRepository.findAll();

        StringBuilder result = new StringBuilder();

        result.append("Students\n\n");

        for (College college : colleges) {

            if (college.getStudents() != null) {

                for (Student student : college.getStudents()) {

                    result.append("Student Name : ")
                            .append(student.getStudentName())
                            .append("\n");

                    result.append("Student ID : ")
                            .append(student.getStudentId())
                            .append("\n");

                    result.append("Age : ")
                            .append(student.getAge())
                            .append("\n");

                    result.append("Email : ")
                            .append(student.getEmail())
                            .append("\n");

                    result.append("College : ")
                            .append(college.getName())
                            .append("\n");

                    result.append("---------------------------------\n");
                }
            }
        }

        return result.toString();
    }

    @Tool(description = "Returns all students of a particular college")
    public String getStudentsByCollege(String collegeName) {

        List<College> colleges = collegeRepository.findAll();

        for (College college : colleges) {

            if (college.getName().equalsIgnoreCase(collegeName)) {

                StringBuilder result = new StringBuilder();

                result.append("Students of ")
                        .append(college.getName())
                        .append("\n\n");

                if (college.getStudents() == null
                        || college.getStudents().isEmpty()) {

                    return "No students found.";
                }

                for (Student student : college.getStudents()) {

                    result.append(student.getStudentName())
                            .append(" (")
                            .append(student.getStudentId())
                            .append(")\n");
                }

                return result.toString();
            }
        }

        return "College not found.";
    }

    @Tool(description = "Returns student details using student name")
    public String getStudentDetails(String studentName) {

        List<College> colleges = collegeRepository.findAll();

        for (College college : colleges) {

            if (college.getStudents() != null) {

                for (Student student : college.getStudents()) {

                    if (student.getStudentName()
                            .equalsIgnoreCase(studentName)) {

                        return """
Student Name : %s
Student ID : %s
Age : %d
Email : %s
College : %s
"""
                        .formatted(
                                student.getStudentName(),
                                student.getStudentId(),
                                student.getAge(),
                                student.getEmail(),
                                college.getName()
                        );
                    }
                }
            }
        }

        return "Student not found.";
    }

}