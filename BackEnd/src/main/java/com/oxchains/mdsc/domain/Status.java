package com.oxchains.mdsc.domain;

import javax.persistence.*;

/**
 * Created by Luo_xuri on 2017/10/16.
 */
@Entity
@Table(name = "status")
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String recordid;
    private String permissionstatus;
    private String userid;

    @Transient
    private Hospital hospital;

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getRecordid() {
        return recordid;
    }

    public void setRecordid(String recordid) {
        this.recordid = recordid;
    }

    public String getPermissionstatus() {
        return permissionstatus;
    }

    public void setPermissionstatus(String permissionstatus) {
        this.permissionstatus = permissionstatus;
    }

    public Hospital getHospital() {
        return hospital;
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }
}
