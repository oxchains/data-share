package com.oxchains.mdsc.domain;

import javax.persistence.*;

/**
 * Created by Luo_xuri on 2017/10/16.
 */
@Entity
@Table(name = "status", uniqueConstraints = @UniqueConstraint(columnNames = { "recordid" }))
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String providerid;
    private String recordid;
    private String ownerid;
    private String permissionstatus;
    private String requestproviderid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProviderid() {
        return providerid;
    }

    public void setProviderid(String providerid) {
        this.providerid = providerid;
    }

    public String getRecordid() {
        return recordid;
    }

    public void setRecordid(String recordid) {
        this.recordid = recordid;
    }

    public String getOwnerid() {
        return ownerid;
    }

    public void setOwnerid(String ownerid) {
        this.ownerid = ownerid;
    }

    public String getPermissionstatus() {
        return permissionstatus;
    }

    public void setPermissionstatus(String permissionstatus) {
        this.permissionstatus = permissionstatus;
    }

    public String getRequestproviderid() {
        return requestproviderid;
    }

    public void setRequestproviderid(String requestproviderid) {
        this.requestproviderid = requestproviderid;
    }
}
