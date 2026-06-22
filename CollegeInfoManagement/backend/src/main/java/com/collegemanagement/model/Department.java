package com.collegemanagement.model;

public class Department {

    private String departmentId;
    private String departmentName;
    private String hod;

    public Department() {
    }

    public Department(String departmentId, String departmentName, String hod) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.hod = hod;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getHod() {
        return hod;
    }

    public void setHod(String hod) {
        this.hod = hod;
    }
}