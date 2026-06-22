package com.collegemanagement.repository;

import com.collegemanagement.model.College;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CollegeRepository extends MongoRepository<College, String> {

    List<College> findByState(String state);

    List<College> findByCity(String city);

    List<College> findByCourseType(String courseType);

    List<College> findByRatingGreaterThanEqual(Double rating);

    List<College> findByRankingLessThanEqual(Integer ranking);

    List<College> findByFeesLessThanEqual(Double fees);

    List<College> findByNameContainingIgnoreCase(String name);
}