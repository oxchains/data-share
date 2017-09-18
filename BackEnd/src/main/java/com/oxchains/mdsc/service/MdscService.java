package com.oxchains.mdsc.service;

import com.oxchains.mdsc.domain.ChaincodeResp;
import com.oxchains.mdsc.domain.RestResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MdscService {
    @Autowired
    private ChaincodeService chaincodeService;

    //1.注册
    public RestResp register(String userId, String userName, String userInfo, String userType) {
        //String txId=chaincodeClient.invoke(args).filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        String args = String.format("%s,%s,%s,%s,%s", "register", userId, userName, userInfo, userType);
        //Optional<ChaincodeResp> optional= chaincodeService.invoke("register",userId);
        Optional<ChaincodeResp> optional = chaincodeService.invoke(args);
        String txId = optional.filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        if (txId == null) {
            return RestResp.fail("注册失败");
        }
        //String payload=optional.map(ChaincodeResp::getPayload).orElse(null);
        return RestResp.success("注册成功");
    }

    //2.用户添加记录
    public RestResp addRecord(String recordId, String ownerId, String providerId, String accessInfo, String patientInfo, String datahash) {
        String args = String.format("%s,%s,%s,%s,%s,%s,%s", "addRecord", recordId, ownerId, providerId, accessInfo, patientInfo, datahash);
        Optional<ChaincodeResp> optional = chaincodeService.invoke(args);
        String txId = optional.filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        if (txId == null) {
            return RestResp.fail("添加纪录失败");
        }
        return RestResp.success("添加记录成功");
    }

    //3.数据所有者添加权限
    public RestResp addPermission(String recordId, String ownerId, String userId, String permissionType, String deadline) {
        String args = String.format("%s,%s,%s,%s,%s,%s", "addPermission", recordId, ownerId, userId, permissionType, deadline);
        Optional<ChaincodeResp> optional = chaincodeService.invoke(args);
        String txId = optional.filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        if (txId == null) {
            return RestResp.fail("添加权限失败");
        }
        return RestResp.success("添加权限成功");
    }

    //4.数据所有者移除部分用户权限
    public RestResp removePermission(String recordId, String ownerId, String userId) {
        String args = String.format("%s,%s,%s,%s", "removePermission", recordId, ownerId, userId);
        Optional<ChaincodeResp> optional = chaincodeService.invoke(args);
        String txId = optional.filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        if (txId == null) {
            return RestResp.fail("删除权限失败");
        }
        return RestResp.success("删除权限成功");
    }

    //5.数据所有者更新数据访问信息
    public RestResp updateAccessInfo(String recordId, String providerId, String accessInfo) {
        String args = String.format("%s,%s,%s,%s", "updateAccessInfo", recordId, providerId, accessInfo);
        Optional<ChaincodeResp> optional = chaincodeService.invoke(args);
        String txId = optional.filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        if (txId == null) {
            return RestResp.fail("更新数据访问信息失败");
        }
        String payload = optional.map(ChaincodeResp::getPayload).orElse(null);
        return RestResp.success("更新数据访问信息成功", payload);
    }

    //6.数据所有者查询记录
    public RestResp getRecord(String recordId, String userId) {
        String args = String.format("%s,%s,%s", "getRecord", recordId, userId);
        Optional<ChaincodeResp> optional = chaincodeService.query(args);
        String txId = optional.filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        if (txId == null) {
            return RestResp.fail("获取记录失败");
        }
        String payload = optional.map(ChaincodeResp::getPayload).orElse(null);
        return RestResp.success("获取记录成功", payload);
    }

    //7.用户查询自己summary
    public RestResp getSummary(String userId) {
        String args = String.format("%s,%s", "getSummary", userId);
        Optional<ChaincodeResp> optional = chaincodeService.query(args);
        String txId = optional.filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        if (txId == null) {
            return RestResp.fail("操作失败");
        }
        String payload = optional.map(ChaincodeResp::getPayload).orElse(null);
        return RestResp.success("操作成功", payload);
    }

    //8.B（数据拥有者）判断A（数据请求者）是否拥有该条数据权限
    public RestResp havePermissionProvider(String recordId, String providerId, String userId) {
        String args = String.format("%s,%s,%s,%s", "havePermissionProvider", recordId, providerId, userId);
        Optional<ChaincodeResp> optional = chaincodeService.query(args);
        String txId = optional.filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        if (txId == null) {
            return RestResp.fail("操作失败");
        }
        String payload = optional.map(ChaincodeResp::getPayload).orElse(null);
        return RestResp.success("操作成功", payload);
    }

    //9.A（数据请求者）判断自己是否用某条记录的权限
    public RestResp havePermissionUser(String userId, String recordId) {
        String args = String.format("%s,%s,%s", "havePermissionUser", userId, recordId);
        Optional<ChaincodeResp> optional = chaincodeService.query(args);
        String txId = optional.filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        if (txId == null) {
            return RestResp.fail("操作失败");
        }
        String payload = optional.map(ChaincodeResp::getPayload).orElse(null);
        return RestResp.success("操作成功", payload);
    }

    //10
    public RestResp buyForRecord(String recordId, String userId, String deadline) {
        String args = String.format("", "buyForRecord", recordId, userId, deadline);
        Optional<ChaincodeResp> optional = chaincodeService.invoke(args);
        String txId = optional.filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        if (txId == null) return RestResp.fail("获取记录失败");
        String payload = optional.map(ChaincodeResp::getPayload).orElse(null);
        return RestResp.success("获取记录成功", payload);
    }

    //11
    public RestResp setShareItem(String recordId, String ownerId, String patientdata) {
        String args = String.format("%s,%s,%s,%s", "setShareItem", recordId, ownerId, patientdata);
        Optional<ChaincodeResp> optional = chaincodeService.invoke(args);
        String txId = optional.filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        if (txId == null) return RestResp.fail("更新信息失败");
        String payload = optional.map(ChaincodeResp::getPayload).orElse(null);
        return RestResp.success("更新成功", payload);
    }

    public RestResp setShareItemString(String recordId, String ownerId, String dataItem, String itemIngegral) {
        String args = String.format("%s,%s,%s,%s,%s", "setShareItemString", recordId, ownerId, dataItem, itemIngegral);
        Optional<ChaincodeResp> optional = chaincodeService.invoke(args);
        String txId = optional.filter(ChaincodeResp::succeeded).map(ChaincodeResp::getTxid).orElse(null);
        if (txId == null) return RestResp.fail("更新信息失败");
        String payload = optional.map(ChaincodeResp::getPayload).orElse(null);
        return RestResp.success("更新成功", payload);
    }
}
