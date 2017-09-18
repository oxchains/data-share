package com.oxchains.mdsc.service;

import com.oxchains.mdsc.domain.RestResp;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;

@Service
public class MdscxService {
    @Resource
    private ChaincodexService chaincodexService;

    //1.注册
    public RestResp register(String userId, String userName, String userInfo, String userType) {
        return chaincodexService.invoke("register", userId, userName, userInfo, userType);
    }

    //2.用户添加记录
    public RestResp addRecord(String recordId, String ownerId, String providerId, String accessInfo, String patientInfo, String datahash) {
        return chaincodexService.invoke("addRecord", recordId, ownerId, providerId, accessInfo, patientInfo, datahash);
    }

    //3.数据所有者添加权限
    public RestResp addPermission(String recordId, String ownerId, String userId, String permissionType, String deadline) {
        return chaincodexService.invoke("addPermission", recordId, ownerId, userId, permissionType, deadline);
    }

    //4.数据所有者移除部分用户权限
    public RestResp removePermission(String recordId, String ownerId, String userId) {
        return chaincodexService.invoke("removePermission", recordId, ownerId, userId);
    }

    //5.数据所有者更新数据访问信息
    public RestResp updateAccessInfo(String recordId, String providerId, String accessInfo) {
        return chaincodexService.invoke("updateAccessInfo", recordId, providerId, accessInfo);
    }

    //6.数据所有者查询记录
    public RestResp getRecord(String recordId, String userId) {
        return chaincodexService.query("getRecord", recordId, userId);
    }

    //7.用户查询自己summary
    public RestResp getSummary(String userId) {
        return chaincodexService.query("getSummary", userId);
    }

    //8.B（数据拥有者）判断A（数据请求者）是否拥有该条数据权限
    public RestResp havePermissionProvider(String recordId, String providerId, String userId) {
        return chaincodexService.query("havePermissionProvider", recordId, providerId, userId);
    }

    //9.A（数据请求者）判断自己是否用某条记录的权限
    public RestResp havePermissionUser(String recordId, String userId) {
        return chaincodexService.query("havePermissionUser", recordId, userId);
    }

    //10
    public RestResp buyForRecord(String recordId, String userId, String deadline) {
        return chaincodexService.invoke("buyForRecord", recordId, userId, deadline);
    }

    //11
    public RestResp setShareItem(String recordId, String ownerId, String patientdata) {
        return chaincodexService.invoke("setShareItem", recordId, ownerId, patientdata);
    }
   //12
    public RestResp setShareItemString(String recordId, String ownerId, String dataItem, String itemIngegral) {
        return chaincodexService.invoke("setShareItemString", recordId, ownerId, dataItem, itemIngegral);
    }
}
