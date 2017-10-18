package com.oxchains.mdsc.domain;

/**
 * Created by Luo_xuri on 2017/9/26.
 */

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "hospital", uniqueConstraints = @UniqueConstraint(columnNames = { "recordid" }))
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String providerid;      // 医院唯一标识
    private String ownerid;         // 病人唯一标识
    private String recordid;        // 病历标识
    private String userid;          // 可代表医院，病人，第三方机构
    @Transient
    private String username;        // 所有链上注册相关的字段转移到user表和compose_user表中
    @Transient
    private String userinfo;
    @Transient
    private String usertype;
    @Transient
    private String accessinfo;
    @Transient
    private String patientinfo;
    @Transient
    private String datahash;        // 暂时没有用到
    private String permissiontype;  // 权限类型
    private String deadline;        // 有效期限，暂时没有用到

    private String healailment;
    private String healtime;

    // 某一种病历中的详情,(已修改为一对一id关联)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recorddetails")
    @Transient
    private RecordDetails recorddetails;

    @Transient
    private String tempStatus;

    private String loginid;

    @Transient
    private String requestproviderid;

    @Transient
    private Status status;

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

    public String getOwnerid() {
        return ownerid;
    }

    public void setOwnerid(String ownerid) {
        this.ownerid = ownerid;
    }

    public String getRecordid() {
        return recordid;
    }

    public void setRecordid(String recordid) {
        this.recordid = recordid;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserinfo() {
        return userinfo;
    }

    public void setUserinfo(String userinfo) {
        this.userinfo = userinfo;
    }

    public String getUsertype() {
        return usertype;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
    }

    public String getAccessinfo() {
        return accessinfo;
    }

    public void setAccessinfo(String accessinfo) {
        this.accessinfo = accessinfo;
    }

    public String getPatientinfo() {
        return patientinfo;
    }

    public void setPatientinfo(String patientinfo) {
        this.patientinfo = patientinfo;
    }

    public String getDatahash() {
        return datahash;
    }

    public void setDatahash(String datahash) {
        this.datahash = datahash;
    }

    public String getPermissiontype() {
        return permissiontype;
    }

    public void setPermissiontype(String permissiontype) {
        this.permissiontype = permissiontype;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getHealailment() {
        return healailment;
    }

    public void setHealailment(String healailment) {
        this.healailment = healailment;
    }

    public String getHealtime() {
        return healtime;
    }

    public void setHealtime(String healtime) {
        this.healtime = healtime;
    }

    public RecordDetails getRecorddetails() {
        return recorddetails;
    }

    public void setRecorddetails(RecordDetails recorddetails) {
        this.recorddetails = recorddetails;
    }

    public String getTempStatus() {
        return tempStatus;
    }

    public void setTempStatus(String tempStatus) {
        this.tempStatus = tempStatus;
    }

    public String getLoginid() {
        return loginid;
    }

    public void setLoginid(String loginid) {
        this.loginid = loginid;
    }

    public String getRequestproviderid() {
        return requestproviderid;
    }

    public void setRequestproviderid(String requestproviderid) {
        this.requestproviderid = requestproviderid;
    }


    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
