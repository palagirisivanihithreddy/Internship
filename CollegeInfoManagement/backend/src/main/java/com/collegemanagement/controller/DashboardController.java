package com.collegemanagement.controller;

import com.collegemanagement.model.College;
import com.collegemanagement.repository.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private CollegeRepository collegeRepository;

    @GetMapping("/stats")
    public Map<String, Integer> getStats() {

        List<College> colleges = collegeRepository.findAll();

        int totalColleges = colleges.size();
        int totalStudents = 0;
        int totalDepartments = 0;
        int totalPlacements = 0;

        for (College college : colleges) {

            if (college.getStudents() != null) {
                totalStudents += college.getStudents().size();
            }

            if (college.getDepartments() != null) {
                totalDepartments += college.getDepartments().size();
            }

            if (college.getPlacements() != null) {
                totalPlacements += college.getPlacements().size();
            }
        }

        Map<String, Integer> stats = new HashMap<>();

        stats.put("totalColleges", totalColleges);
        stats.put("totalStudents", totalStudents);
        stats.put("totalDepartments", totalDepartments);
        stats.put("totalPlacements", totalPlacements);

        return stats;
    }
}