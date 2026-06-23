package com.collegemanagement.controller;

import com.collegemanagement.model.College;
import com.collegemanagement.repository.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private CollegeRepository collegeRepository;

    @GetMapping("/stats")
    public Map<String, Integer> getStats() {

        List<College> colleges =
                collegeRepository.findAll();

        int totalColleges = colleges.size();
        int totalStudents = 0;
        int totalDepartments = 0;
        int totalPlacements = 0;
        int totalFaculties = 0;

        for (College college : colleges) {

            totalStudents +=
                    college.getStudents() == null ?
                            0 :
                            college.getStudents().size();

            totalDepartments +=
                    college.getDepartments() == null ?
                            0 :
                            college.getDepartments().size();

            totalPlacements +=
                    college.getPlacements() == null ?
                            0 :
                            college.getPlacements().size();

            totalFaculties +=
                    college.getFaculties() == null ?
                            0 :
                            college.getFaculties().size();
        }

        Map<String, Integer> stats =
                new HashMap<>();

        stats.put(
                "totalColleges",
                totalColleges
        );

        stats.put(
                "totalStudents",
                totalStudents
        );

        stats.put(
                "totalDepartments",
                totalDepartments
        );

        stats.put(
                "totalPlacements",
                totalPlacements
        );

        stats.put(
                "totalFaculties",
                totalFaculties
        );

        return stats;
    }

    @GetMapping("/course-stats")
    public List<Map<String, Object>>
    getCourseStats() {

        List<College> colleges =
                collegeRepository.findAll();

        Map<String, Integer> courseMap =
                new TreeMap<>();

        for (College college : colleges) {

            String course =
                    college.getCourseType();

            if (course == null ||
                    course.trim().isEmpty()) {

                course = "Others";
            }

            courseMap.put(
                    course,
                    courseMap.getOrDefault(
                            course,
                            0
                    ) + 1
            );
        }

        List<Map<String, Object>>
                result = new ArrayList<>();

        for (Map.Entry<String, Integer>
                entry : courseMap.entrySet()) {

            Map<String, Object> row =
                    new HashMap<>();

            row.put(
                    "course",
                    entry.getKey()
            );

            row.put(
                    "count",
                    entry.getValue()
            );

            result.add(row);
        }

        return result;
    }

    @GetMapping("/recent-colleges")
    public List<College>
    recentColleges() {

        List<College> colleges =
                collegeRepository.findAll();

        Collections.reverse(colleges);

        if (colleges.size() > 5) {

            return colleges.subList(
                    0,
                    5
            );
        }

        return colleges;
    }
}