package com.oxchains.mdsc.domain;

import jline.TerminalFactory;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Luo_xuri on 2017/10/11.
 */
@Entity
@Table(name = "recorddetails")
public class RecordDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String patientname;
    private String patientage;
    private String patientsex;
    private String ownhospital;
    private String department;
    private String details;
    @Transient
    private Hospital hospital;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPatientname() {
        return patientname;
    }

    public void setPatientname(String patientname) {
        this.patientname = patientname;
    }

    public String getPatientage() {
        return patientage;
    }

    public void setPatientage(String patientage) {
        this.patientage = patientage;
    }

    public String getPatientsex() {
        return patientsex;
    }

    public void setPatientsex(String patientsex) {
        this.patientsex = patientsex;
    }

    public String getOwnhospital() {
        return ownhospital;
    }

    public void setOwnhospital(String ownhospital) {
        this.ownhospital = ownhospital;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Hospital getHospital() {
        return hospital;
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }
}
