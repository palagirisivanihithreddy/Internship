package com.collegemanagement.controller;

import com.collegemanagement.model.*;
import com.collegemanagement.repository.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private CollegeRepository collegeRepository;

    // =========================
    // DEPARTMENT CRUD
    // =========================

    @PostMapping("/college/{collegeId}/department")
    public College addDepartment(
            @PathVariable String collegeId,
            @RequestBody Department department) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null)
            return null;

        if (college.getDepartments() == null) {
            college.setDepartments(new ArrayList<>());
        }

        college.getDepartments().add(department);

        return collegeRepository.save(college);
    }

    @PutMapping("/college/{collegeId}/department/{departmentId}")
    public College updateDepartment(
            @PathVariable String collegeId,
            @PathVariable String departmentId,
            @RequestBody Department updatedDepartment) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null || college.getDepartments() == null)
            return null;

        for (Department department : college.getDepartments()) {

            if (department.getDepartmentId().equals(departmentId)) {

                department.setDepartmentName(
                        updatedDepartment.getDepartmentName());

                department.setHod(
                        updatedDepartment.getHod());
            }
        }

        return collegeRepository.save(college);
    }

    @DeleteMapping("/college/{collegeId}/department/{departmentId}")
    public College deleteDepartment(
            @PathVariable String collegeId,
            @PathVariable String departmentId) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null || college.getDepartments() == null)
            return null;

        college.getDepartments().removeIf(
                department ->
                        department.getDepartmentId()
                                .equals(departmentId));

        return collegeRepository.save(college);
    }

    // =========================
    // STUDENT CRUD
    // =========================

    @PostMapping("/college/{collegeId}/student")
    public College addStudent(
            @PathVariable String collegeId,
            @RequestBody Student student) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null)
            return null;

        if (college.getStudents() == null) {
            college.setStudents(new ArrayList<>());
        }

        college.getStudents().add(student);

        return collegeRepository.save(college);
    }

    @PutMapping("/college/{collegeId}/student/{studentId}")
    public College updateStudent(
            @PathVariable String collegeId,
            @PathVariable String studentId,
            @RequestBody Student updatedStudent) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null || college.getStudents() == null)
            return null;

        for (Student student : college.getStudents()) {

            if (student.getStudentId().equals(studentId)) {

                student.setStudentName(
                        updatedStudent.getStudentName());

                student.setAge(
                        updatedStudent.getAge());

                student.setEmail(
                        updatedStudent.getEmail());
            }
        }

        return collegeRepository.save(college);
    }

    @DeleteMapping("/college/{collegeId}/student/{studentId}")
    public College deleteStudent(
            @PathVariable String collegeId,
            @PathVariable String studentId) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null || college.getStudents() == null)
            return null;

        college.getStudents().removeIf(
                student ->
                        student.getStudentId()
                                .equals(studentId));

        return collegeRepository.save(college);
    }

    // =========================
    // FACULTY CRUD
    // =========================

    @PostMapping("/college/{collegeId}/faculty")
    public College addFaculty(
            @PathVariable String collegeId,
            @RequestBody Faculty faculty) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null)
            return null;

        if (college.getFaculties() == null) {
            college.setFaculties(new ArrayList<>());
        }

        college.getFaculties().add(faculty);

        return collegeRepository.save(college);
    }

    @PutMapping("/college/{collegeId}/faculty/{facultyId}")
    public College updateFaculty(
            @PathVariable String collegeId,
            @PathVariable String facultyId,
            @RequestBody Faculty updatedFaculty) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null || college.getFaculties() == null)
            return null;

        for (Faculty faculty : college.getFaculties()) {

            if (faculty.getFacultyId().equals(facultyId)) {

                faculty.setFacultyName(
                        updatedFaculty.getFacultyName());

                faculty.setSubject(
                        updatedFaculty.getSubject());
            }
        }

        return collegeRepository.save(college);
    }

    @DeleteMapping("/college/{collegeId}/faculty/{facultyId}")
    public College deleteFaculty(
            @PathVariable String collegeId,
            @PathVariable String facultyId) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null || college.getFaculties() == null)
            return null;

        college.getFaculties().removeIf(
                faculty ->
                        faculty.getFacultyId()
                                .equals(facultyId));

        return collegeRepository.save(college);
    }

    // =========================
    // PLACEMENT CRUD
    // =========================

    @PostMapping("/college/{collegeId}/placement")
    public College addPlacement(
            @PathVariable String collegeId,
            @RequestBody Placement placement) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null)
            return null;

        if (college.getPlacements() == null) {
            college.setPlacements(new ArrayList<>());
        }

        college.getPlacements().add(placement);

        return collegeRepository.save(college);
    }

    @PutMapping("/college/{collegeId}/placement/{companyName}")
    public College updatePlacement(
            @PathVariable String collegeId,
            @PathVariable String companyName,
            @RequestBody Placement updatedPlacement) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null || college.getPlacements() == null)
            return null;

        for (Placement placement : college.getPlacements()) {

            if (placement.getCompanyName().equals(companyName)) {

                placement.setCompanyName(
                        updatedPlacement.getCompanyName());

                placement.setPackageOffered(
                        updatedPlacement.getPackageOffered());
            }
        }

        return collegeRepository.save(college);
    }

    @DeleteMapping("/college/{collegeId}/placement/{companyName}")
    public College deletePlacement(
            @PathVariable String collegeId,
            @PathVariable String companyName) {

        College college = collegeRepository
                .findById(collegeId)
                .orElse(null);

        if (college == null || college.getPlacements() == null)
            return null;

        college.getPlacements().removeIf(
                placement ->
                        placement.getCompanyName()
                                .equals(companyName));

        return collegeRepository.save(college);
    }
// =========================
// GET DEPARTMENTS
// =========================

@GetMapping("/college/{collegeId}/departments")
public List<Department> getDepartments(
        @PathVariable String collegeId) {

    College college = collegeRepository
            .findById(collegeId)
            .orElse(null);

    if (college == null)
        return new ArrayList<>();

    return college.getDepartments();
}

// =========================
// GET STUDENTS
// =========================

@GetMapping("/college/{collegeId}/students")
public List<Student> getStudents(
        @PathVariable String collegeId) {

    College college = collegeRepository
            .findById(collegeId)
            .orElse(null);

    if (college == null)
        return new ArrayList<>();

    return college.getStudents();
}

// =========================
// GET FACULTIES
// =========================

@GetMapping("/college/{collegeId}/faculties")
public List<Faculty> getFaculties(
        @PathVariable String collegeId) {

    College college = collegeRepository
            .findById(collegeId)
            .orElse(null);

    if (college == null)
        return new ArrayList<>();

    return college.getFaculties();
}

// =========================
// GET PLACEMENTS
// =========================

@GetMapping("/college/{collegeId}/placements")
public List<Placement> getPlacements(
        @PathVariable String collegeId) {

    College college = collegeRepository
            .findById(collegeId)
            .orElse(null);

    if (college == null)
        return new ArrayList<>();

    return college.getPlacements();
}
}