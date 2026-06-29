package com.collegemanagement.mcp;

import com.collegemanagement.model.College;
import com.collegemanagement.model.Department;
import com.collegemanagement.repository.CollegeRepository;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DepartmentTools {

    private final CollegeRepository collegeRepository;

    public DepartmentTools(CollegeRepository collegeRepository) {
        this.collegeRepository = collegeRepository;
    }

    @Tool(description = "Returns total number of departments")
    public String getTotalDepartments() {

        int total = 0;

        List<College> colleges = collegeRepository.findAll();

        for (College college : colleges) {

            if (college.getDepartments() != null) {
                total += college.getDepartments().size();
            }
        }

        return "Total Departments : " + total;
    }

    @Tool(description = "Returns list of all departments")
    public String getAllDepartments() {

        List<College> colleges = collegeRepository.findAll();

        StringBuilder result = new StringBuilder();

        result.append("Departments\n\n");

        for (College college : colleges) {

            if (college.getDepartments() != null) {

                for (Department department : college.getDepartments()) {

                    result.append("Department : ")
                            .append(department.getDepartmentName())
                            .append("\n");

                    result.append("Department ID : ")
                            .append(department.getDepartmentId())
                            .append("\n");

                    result.append("HOD : ")
                            .append(department.getHod())
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

    @Tool(description = "Returns departments of a particular college")
    public String getDepartmentsByCollege(String collegeName) {

        List<College> colleges = collegeRepository.findAll();

        for (College college : colleges) {

            if (college.getName().equalsIgnoreCase(collegeName)) {

                StringBuilder result = new StringBuilder();

                result.append("Departments of ")
                        .append(college.getName())
                        .append("\n\n");

                if (college.getDepartments() == null
                        || college.getDepartments().isEmpty()) {

                    return "No departments found.";
                }

                for (Department department : college.getDepartments()) {

                    result.append(department.getDepartmentName())
                            .append("\n");
                }

                return result.toString();
            }
        }

        return "College not found.";
    }

    @Tool(description = "Returns department details using department name")
    public String getDepartmentDetails(String departmentName) {

        List<College> colleges = collegeRepository.findAll();

        for (College college : colleges) {

            if (college.getDepartments() != null) {

                for (Department department : college.getDepartments()) {

                    if (department.getDepartmentName()
                            .equalsIgnoreCase(departmentName)) {

                        return """
Department : %s
Department ID : %s
HOD : %s
College : %s
"""
                        .formatted(
                                department.getDepartmentName(),
                                department.getDepartmentId(),
                                department.getHod(),
                                college.getName()
                        );
                    }
                }
            }
        }

        return "Department not found.";
    }

}