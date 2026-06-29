package com.collegemanagement.mcp;

import com.collegemanagement.model.College;
import com.collegemanagement.model.Faculty;
import com.collegemanagement.repository.CollegeRepository;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FacultyTools {

    private final CollegeRepository collegeRepository;

    public FacultyTools(CollegeRepository collegeRepository) {
        this.collegeRepository = collegeRepository;
    }

    @Tool(description = "Returns total number of faculties")
    public String getTotalFaculties() {

        int total = 0;

        List<College> colleges = collegeRepository.findAll();

        for (College college : colleges) {

            if (college.getFaculties() != null) {
                total += college.getFaculties().size();
            }
        }

        return "Total Faculties : " + total;
    }

    @Tool(description = "Returns list of all faculties")
    public String getAllFaculties() {

        List<College> colleges = collegeRepository.findAll();

        StringBuilder result = new StringBuilder();

        result.append("Faculties\n\n");

        for (College college : colleges) {

            if (college.getFaculties() != null) {

                for (Faculty faculty : college.getFaculties()) {

                    result.append("Faculty Name : ")
                            .append(faculty.getFacultyName())
                            .append("\n");

                    result.append("Faculty ID : ")
                            .append(faculty.getFacultyId())
                            .append("\n");

                    result.append("Subject : ")
                            .append(faculty.getSubject())
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

    @Tool(description = "Returns faculties of a particular college")
    public String getFacultiesByCollege(String collegeName) {

        List<College> colleges = collegeRepository.findAll();

        for (College college : colleges) {

            if (college.getName().equalsIgnoreCase(collegeName)) {

                StringBuilder result = new StringBuilder();

                result.append("Faculties of ")
                        .append(college.getName())
                        .append("\n\n");

                if (college.getFaculties() == null
                        || college.getFaculties().isEmpty()) {

                    return "No faculties found.";
                }

                for (Faculty faculty : college.getFaculties()) {

                    result.append(faculty.getFacultyName())
                            .append(" - ")
                            .append(faculty.getSubject())
                            .append("\n");
                }

                return result.toString();
            }
        }

        return "College not found.";
    }

    @Tool(description = "Returns faculty details using faculty name")
    public String getFacultyDetails(String facultyName) {

        List<College> colleges = collegeRepository.findAll();

        for (College college : colleges) {

            if (college.getFaculties() != null) {

                for (Faculty faculty : college.getFaculties()) {

                    if (faculty.getFacultyName()
                            .equalsIgnoreCase(facultyName)) {

                        return """
Faculty Name : %s
Faculty ID : %s
Subject : %s
College : %s
"""
                        .formatted(
                                faculty.getFacultyName(),
                                faculty.getFacultyId(),
                                faculty.getSubject(),
                                college.getName()
                        );
                    }
                }
            }
        }

        return "Faculty not found.";
    }

}