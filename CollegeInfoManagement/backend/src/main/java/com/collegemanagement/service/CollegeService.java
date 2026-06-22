package com.collegemanagement.service;

import com.collegemanagement.model.College;
import com.collegemanagement.repository.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollegeService {

    @Autowired
    private CollegeRepository collegeRepository;

    public List<College> getAllColleges() {
        return collegeRepository.findAll();
    }

    public College getCollegeById(String id) {
        return collegeRepository.findById(id).orElse(null);
    }

    public College saveCollege(College college) {
        return collegeRepository.save(college);
    }

    public void deleteCollege(String id) {
        collegeRepository.deleteById(id);
    }

    public List<College> getByCourseType(String courseType) {
        return collegeRepository.findByCourseType(courseType);
    }

    public List<College> getByState(String state) {
        return collegeRepository.findByState(state);
    }

    public List<College> getByRanking(Integer ranking) {
        return collegeRepository.findByRankingLessThanEqual(ranking);
    }

    public List<College> getByRating(Double rating) {
        return collegeRepository.findByRatingGreaterThanEqual(rating);
    }

    public List<College> getByFees(Double fees) {
        return collegeRepository.findByFeesLessThanEqual(fees);
    }

    public List<College> getByCity(String city) {
        return collegeRepository.findByCity(city);
    }

    public List<College> searchByName(String name) {
        return collegeRepository.findByNameContainingIgnoreCase(name);
    }
}