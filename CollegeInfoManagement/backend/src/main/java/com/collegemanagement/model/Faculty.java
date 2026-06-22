package com.collegemanagement.model;

public class Faculty {

    private String facultyId;
    private String facultyName;
    private String subject;

    public Faculty() {
    }

    public Faculty(String facultyId,
                   String facultyName,
                   String subject) {
        this.facultyId = facultyId;
        this.facultyName = facultyName;
        this.subject = subject;
    }

    public String getFacultyId() {
        return facultyId;
    }

    public void setFacultyId(String facultyId) {
        this.facultyId = facultyId;
    }

    public String getFacultyName() {
        return facultyName;
    }

    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}