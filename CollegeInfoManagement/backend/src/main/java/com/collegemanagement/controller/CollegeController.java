package com.collegemanagement.controller;

import com.collegemanagement.model.*;
import com.collegemanagement.repository.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/colleges")
@CrossOrigin("*")
public class CollegeController {

    @Autowired
    private CollegeRepository collegeRepository;

    @GetMapping
    public List<College> getColleges() {
        return collegeRepository.findAll();
    }

    @GetMapping("/{id}")
    public College getCollegeById(@PathVariable String id) {
        return collegeRepository.findById(id).orElse(null);
    }

    @PostMapping
    public College createCollege(@RequestBody College college) {
        return collegeRepository.save(college);
    }

    @PutMapping("/{id}")
    public College updateCollege(
            @PathVariable String id,
            @RequestBody College updatedCollege) {

        College college = collegeRepository.findById(id).orElse(null);

        if (college != null) {

            college.setName(updatedCollege.getName());
            college.setState(updatedCollege.getState());
            college.setCity(updatedCollege.getCity());
            college.setCourseType(updatedCollege.getCourseType());
            college.setFees(updatedCollege.getFees());
            college.setRating(updatedCollege.getRating());
            college.setRanking(updatedCollege.getRanking());

            college.setDepartments(updatedCollege.getDepartments());
            college.setStudents(updatedCollege.getStudents());
            college.setFaculties(updatedCollege.getFaculties());
            college.setPlacements(updatedCollege.getPlacements());

            return collegeRepository.save(college);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteCollege(@PathVariable String id) {

        collegeRepository.deleteById(id);

        return "College Deleted Successfully";
    }

    @GetMapping("/state/{state}")
    public List<College> getByState(@PathVariable String state) {
        return collegeRepository.findByState(state);
    }

    @GetMapping("/city/{city}")
    public List<College> getByCity(@PathVariable String city) {
        return collegeRepository.findByCity(city);
    }

    @GetMapping("/course/{courseType}")
    public List<College> getByCourseType(@PathVariable String courseType) {
        return collegeRepository.findByCourseType(courseType);
    }

    @GetMapping("/rating/{rating}")
    public List<College> getByRating(@PathVariable Double rating) {
        return collegeRepository.findByRatingGreaterThanEqual(rating);
    }

    @GetMapping("/ranking/{ranking}")
    public List<College> getByRanking(@PathVariable Integer ranking) {
        return collegeRepository.findByRankingLessThanEqual(ranking);
    }

    @GetMapping("/fees/{fees}")
    public List<College> getByFees(@PathVariable Double fees) {
        return collegeRepository.findByFeesLessThanEqual(fees);
    }

    // OLD SEARCH (College Name Search)
    @GetMapping("/searchbyname/{name}")
    public List<College> searchCollege(@PathVariable String name) {
        return collegeRepository.findByNameContainingIgnoreCase(name);
    }

    // NEW UNIVERSAL SEARCH
    @GetMapping("/search/{keyword}")
    public List<College> universalSearch(
            @PathVariable String keyword
    ) {

        String search = keyword.toLowerCase();

        return collegeRepository.findAll()
                .stream()
                .filter(college ->

                        (college.getName() != null &&
                                college.getName().toLowerCase().contains(search))

                                ||

                                (college.getCity() != null &&
                                        college.getCity().toLowerCase().contains(search))

                                ||

                                (college.getState() != null &&
                                        college.getState().toLowerCase().contains(search))

                                ||

                                (college.getCourseType() != null &&
                                        college.getCourseType().toLowerCase().contains(search))

                                ||

                                (college.getDepartments() != null &&
                                        college.getDepartments().stream()
                                                .anyMatch(d ->
                                                        d.getDepartmentName() != null &&
                                                                d.getDepartmentName()
                                                                        .toLowerCase()
                                                                        .contains(search)
                                                ))

                                ||

                                (college.getStudents() != null &&
                                        college.getStudents().stream()
                                                .anyMatch(s ->
                                                        s.getStudentName() != null &&
                                                                s.getStudentName()
                                                                        .toLowerCase()
                                                                        .contains(search)
                                                ))

                                ||

                                (college.getFaculties() != null &&
                                        college.getFaculties().stream()
                                                .anyMatch(f ->
                                                        f.getFacultyName() != null &&
                                                                f.getFacultyName()
                                                                        .toLowerCase()
                                                                        .contains(search)
                                                ))

                                ||

                                (college.getPlacements() != null &&
                                        college.getPlacements().stream()
                                                .anyMatch(p ->
                                                        p.getCompanyName() != null &&
                                                                p.getCompanyName()
                                                                        .toLowerCase()
                                                                        .contains(search)
                                                ))

                )
                .collect(Collectors.toList());
    }
}