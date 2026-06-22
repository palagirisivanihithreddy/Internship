package com.collegemanagement.model;

public class Placement {

    private String companyName;
    private Double packageOffered;

    public Placement() {
    }

    public Placement(String companyName,
                     Double packageOffered) {
        this.companyName = companyName;
        this.packageOffered = packageOffered;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Double getPackageOffered() {
        return packageOffered;
    }

    public void setPackageOffered(Double packageOffered) {
        this.packageOffered = packageOffered;
    }
}