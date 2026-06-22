package com.collegemanagement.controller;

import com.collegemanagement.model.College;
import com.collegemanagement.repository.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/search/{name}")
    public List<College> searchCollege(@PathVariable String name) {
        return collegeRepository.findByNameContainingIgnoreCase(name);
    }
}