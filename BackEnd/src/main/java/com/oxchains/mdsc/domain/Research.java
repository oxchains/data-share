package com.oxchains.mdsc.domain;

import javax.persistence.*;

/**
 * Created by Luo_xuri on 2017/10/12.
 */
@Entity
@Table(name = "research")
public class Research implements IUser{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name; // 相当于注册中的userid
    private String password;
    private String mobile;

    private String researchrealname;
    private String researchinfo;
    private String researchtype;

    @Column(name = "tax_identifier") private String taxIdentifier;

    private String address;

    @Column(name = "bank_name") private String bankName;
    @Column(name = "bank_account") private String bankAccount;

    @Override
    public String toString(){
        return String.format("%s(%s)", name, mobile);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getResearchrealname() {
        return researchrealname;
    }

    public void setResearchrealname(String researchrealname) {
        this.researchrealname = researchrealname;
    }

    public String getResearchinfo() {
        return researchinfo;
    }

    public void setResearchinfo(String researchinfo) {
        this.researchinfo = researchinfo;
    }

    public String getResearchtype() {
        return researchtype;
    }

    public void setResearchtype(String researchtype) {
        this.researchtype = researchtype;
    }

    public String getTaxIdentifier() {
        return taxIdentifier;
    }

    public void setTaxIdentifier(String taxIdentifier) {
        this.taxIdentifier = taxIdentifier;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }
}
