package com.collegemanagement.model;

public class Student {

    private String studentId;
    private String studentName;
    private Integer age;
    private String email;

    public Student() {
    }

    public Student(String studentId, String studentName,
                   Integer age, String email) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.age = age;
        this.email = email;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}