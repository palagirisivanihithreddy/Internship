package com.collegemanagement.model;

public class DashboardStats {

    private int totalColleges;
    private int totalStudents;
    private int totalDepartments;
    private int totalFaculties;
    private int totalPlacements;

    public DashboardStats() {}

    public DashboardStats(
            int totalColleges,
            int totalStudents,
            int totalDepartments,
            int totalFaculties,
            int totalPlacements) {

        this.totalColleges = totalColleges;
        this.totalStudents = totalStudents;
        this.totalDepartments = totalDepartments;
        this.totalFaculties = totalFaculties;
        this.totalPlacements = totalPlacements;
    }

    public int getTotalColleges() {
        return totalColleges;
    }

    public void setTotalColleges(int totalColleges) {
        this.totalColleges = totalColleges;
    }

    public int getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(int totalStudents) {
        this.totalStudents = totalStudents;
    }

    public int getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(int totalDepartments) {
        this.totalDepartments = totalDepartments;
    }

    public int getTotalFaculties() {
        return totalFaculties;
    }

    public void setTotalFaculties(int totalFaculties) {
        this.totalFaculties = totalFaculties;
    }

    public int getTotalPlacements() {
        return totalPlacements;
    }

    public void setTotalPlacements(int totalPlacements) {
        this.totalPlacements = totalPlacements;
    }
}