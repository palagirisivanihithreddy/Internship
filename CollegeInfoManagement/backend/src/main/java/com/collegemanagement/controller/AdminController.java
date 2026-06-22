package com.collegemanagement.controller;

import com.collegemanagement.model.*;
import com.collegemanagement.repository.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private CollegeRepository collegeRepository;

    @PostMapping("/college/{collegeId}/department")
    public College addDepartment(
            @PathVariable String collegeId,
            @RequestBody Department department
    ) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null) return null;

        if (college.getDepartments() == null) {
            college.setDepartments(new ArrayList<>());
        }

        college.getDepartments().add(department);

        return collegeRepository.save(college);
    }

    @PostMapping("/college/{collegeId}/student")
    public College addStudent(
            @PathVariable String collegeId,
            @RequestBody Student student
    ) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null) return null;

        if (college.getStudents() == null) {
            college.setStudents(new ArrayList<>());
        }

        college.getStudents().add(student);

        return collegeRepository.save(college);
    }

    @PostMapping("/college/{collegeId}/faculty")
    public College addFaculty(
            @PathVariable String collegeId,
            @RequestBody Faculty faculty
    ) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null) return null;

        if (college.getFaculties() == null) {
            college.setFaculties(new ArrayList<>());
        }

        college.getFaculties().add(faculty);

        return collegeRepository.save(college);
    }

    @PostMapping("/college/{collegeId}/placement")
    public College addPlacement(
            @PathVariable String collegeId,
            @RequestBody Placement placement
    ) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null) return null;

        if (college.getPlacements() == null) {
            college.setPlacements(new ArrayList<>());
        }

        college.getPlacements().add(placement);

        return collegeRepository.save(college);
    }
}