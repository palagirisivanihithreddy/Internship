package com.collegemanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "colleges")
public class College {

    @Id
    private String id;

    private String name;
    private String state;
    private String city;
    private String courseType;
    private Double fees;
    private Double rating;
    private Integer ranking;

    private List<Department> departments;
    private List<Student> students;
    private List<Faculty> faculties;
    private List<Placement> placements;

    public College() {
    }

    public College(String id,
                   String name,
                   String state,
                   String city,
                   String courseType,
                   Double fees,
                   Double rating,
                   Integer ranking,
                   List<Department> departments,
                   List<Student> students,
                   List<Faculty> faculties,
                   List<Placement> placements) {

        this.id = id;
        this.name = name;
        this.state = state;
        this.city = city;
        this.courseType = courseType;
        this.fees = fees;
        this.rating = rating;
        this.ranking = ranking;
        this.departments = departments;
        this.students = students;
        this.faculties = faculties;
        this.placements = placements;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCourseType() {
        return courseType;
    }

    public void setCourseType(String courseType) {
        this.courseType = courseType;
    }

    public Double getFees() {
        return fees;
    }

    public void setFees(Double fees) {
        this.fees = fees;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getRanking() {
        return ranking;
    }

    public void setRanking(Integer ranking) {
        this.ranking = ranking;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public List<Faculty> getFaculties() {
        return faculties;
    }

    public void setFaculties(List<Faculty> faculties) {
        this.faculties = faculties;
    }

    public List<Placement> getPlacements() {
        return placements;
    }

    public void setPlacements(List<Placement> placements) {
        this.placements = placements;
    }
}