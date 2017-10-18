package com.oxchains.mdsc.service;

import com.oxchains.mdsc.data.*;

import com.oxchains.mdsc.domain.*;
import com.oxchains.mdsc.rest.domain.RestResp;
import gherkin.lexer.Fa;
import io.undertow.server.handlers.proxy.LoadBalancingProxyClient;
import jline.internal.Log;
import org.apache.commons.compress.archivers.arj.ArjArchiveEntry;
import org.apache.zookeeper.data.Stat;
import org.hibernate.hql.internal.ast.tree.RestrictableStatement;
import org.ini4j.spi.RegEscapeTool;
import org.jruby.RubyProcess;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.yecht.Data;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
public class MdscxService {
    @Resource
    private ChaincodexService chaincodexService;
    @Resource
    private HospitalRepo hospitalRepo;
    @Resource
    private RecordDetailsRepo recordDetailsRepo;
    @Resource
    private StatusRepo statusRepo;

    /*
    //1.注册
    public RestResp register(String userId, String userName, String userInfo, String userType) {
        return chaincodexService.invoke("register", userId, userName, userInfo, userType);
    }
    */

    public RestResp register(Hospital hospital) {
        String userId = hospital.getUserid();
        String userName = hospital.getUsername();
        String userInfo = hospital.getUserinfo();
        String userType = hospital.getUsertype();
        return chaincodexService.invoke("register", userId, userName, userInfo, userType);
    }

    // 两种注册绑定到一块之后（user）
    public RestResp bindRegister_user(User user){
        String userId = user.getName();
        String userName = user.getUserrealname();
        String userInfo = user.getUserinfo();
        String userType = user.getUsertype();
        return chaincodexService.invoke("register", userId, userName, userInfo, userType);
    }

    // 两种注册绑定到一块之后（company）
    public RestResp bindRegister_company(CompanyUser companyUser){
        String userId = companyUser.getName();
        String userName = companyUser.getCompanyrealname();
        String userInfo = companyUser.getCompanyinfo();
        String userType = companyUser.getCompanytype();
        return chaincodexService.invoke("register", userId, userName, userInfo, userType);
    }

    // 第三方研究机构（research）
    public RestResp bindRegister_research(Research research){
        String userId = research.getName();
        String userName = research.getResearchrealname();
        String userInfo = research.getResearchinfo();
        String userType = research.getResearchtype();
        return chaincodexService.invoke("register", userId, userName, userInfo, userType);
    }


    //2.用户添加记录
    public RestResp addRecord(Hospital hospital) {
        String recordId = hospital.getRecordid();
        String ownerId = hospital.getOwnerid();
        String providerId = hospital.getProviderid();
        String accessInfo = hospital.getAccessinfo();
        String patientInfo = hospital.getPatientinfo();
        String datahash = hospital.getDatahash();
        return chaincodexService.invoke("addRecord", recordId, ownerId, providerId, accessInfo, patientInfo, datahash);
    }

    //3.数据所有者添加权限
    public RestResp addPermission(Hospital hospital) {
        String recordId = hospital.getRecordid();
        String ownerId = hospital.getOwnerid();
        String userId = hospital.getUserid();
        String permissionType = hospital.getPermissiontype();
        String deadline = hospital.getDeadline();
        return chaincodexService.invoke("addPermission", recordId, ownerId, userId, permissionType, deadline);
    }


    //4.数据所有者移除部分用户权限
    public RestResp removePermission(Hospital hospital) {
        String recordId = hospital.getRecordid();
        String ownerId = hospital.getOwnerid();
        String userId = hospital.getUserid();
        return chaincodexService.invoke("removePermission", recordId, ownerId, userId);
    }

    //5.数据所有者更新数据访问信息
    public RestResp updateAccessInfo(Hospital hospital) {
        String recordId = hospital.getRecordid();
        String providerId = hospital.getProviderid();
        String accessInfo = hospital.getAccessinfo();
        return chaincodexService.invoke("updateAccessInfo", recordId, providerId, accessInfo);
    }

    public RestResp getRecord(Hospital hospital) {
        String recordId = hospital.getRecordid();
        String userId = hospital.getUserid();
        return chaincodexService.query("getRecord", recordId, userId);
    }

    public RestResp getSummary(String userId) {
        return chaincodexService.query("getSummary", userId);
    }

    //8.B（数据拥有者）判断A（数据请求者）是否拥有该条数据权限
    public RestResp havePermissionProvider(Hospital hospital) {
        String recordId = hospital.getRecordid();
        String providerId = hospital.getProviderid();
        String userId = hospital.getUserid();
        return chaincodexService.query("havePermissionProvider", recordId, providerId, userId);
    }

    //9.A（数据请求者）判断自己是否用某条记录的权限
    public RestResp havePermissionUser(String recordId, String userId) {
        return chaincodexService.query("havePermissionUser", recordId, userId);
    }

    //10.购买记录
    public RestResp buyForRecord(Hospital hospital) {
        String recordId = hospital.getRecordid();
        String userId = hospital.getUserid();
        String deadline = hospital.getDeadline();
        return chaincodexService.invoke("buyForRecord", recordId, userId, deadline);
    }

    //11.设置分享条目
    public RestResp setShareItem(Hospital hospital) {
        String recordId = hospital.getRecordid();
        String ownerId = hospital.getOwnerid();
        String patientdata = hospital.getPatientinfo();
        return chaincodexService.invoke("setShareItem", recordId, ownerId, patientdata);
    }

   //12
    public RestResp setShareItemString(String recordId, String ownerId, String dataItem, String itemIngegral) {
        return chaincodexService.invoke("setShareItemString", recordId, ownerId, dataItem, itemIngegral);
    }

    //13 医院请求权限
    public RestResp requestPermission(Hospital hospital){
        if(hospital.getRecordid().isEmpty()){
            return RestResp.fail();
        } else {
            Status statusInfo = statusRepo.findByUseridAndRecordid(hospital.getLoginid(),hospital.getRecordid());
            if (statusInfo != null) {
                String status = statusInfo.getPermissionstatus();
                //statusInfo.setUserid(hospital.getLoginid());
                statusRepo.save(statusInfo);
                if (status.equals("0")) {
                    statusInfo.setPermissionstatus("1");
                    statusRepo.save(statusInfo);
                    return RestResp.success("正在等待授权！");
                }
            }else {
                // 将状态码存到数据库中（1 是 确定）
                statusInfo=new Status();
                statusInfo.setPermissionstatus("1");
                statusInfo.setRecordid(hospital.getRecordid());

                System.out.println(hospital.getLoginid());

                statusInfo.setUserid(hospital.getLoginid());
                statusRepo.save(statusInfo);
                //hospitalRepo.save(hospital);
                return RestResp.success("权限请求成功！");
            }
            return RestResp.fail("申请异常");
        }
    }

    //14 处理请求
    public RestResp solveRequest(Hospital hospital){//1 0
        System.out.println(hospital.getOwnerid());
        System.out.println(hospital.getDeadline());
        System.out.println(hospital.getPermissiontype());
        System.out.println(hospital.getRecordid());
        //Hospital hospitalInfo = hospitalRepo.findByRecordid(hospital.getRecordid());
        //Status statusInfo = statusRepo.findByUseridAndRecordid(hospitalInfo.getUserid(), hospital.getRecordid());
        Status statusInfo = statusRepo.findByUseridAndRecordid(hospital.getUserid(), hospital.getRecordid());
        if (statusInfo != null){
            String status = statusInfo.getPermissionstatus();
            if (status.equals("1")){
                try{
                    this.addPermission(hospital);
                }catch (Exception e){
                    Log.error("添加权限失败", e);
                    return RestResp.fail("添加权限失败");
                }
                statusInfo.setPermissionstatus("2");
                //statusInfo.setUserid(hospital.getLoginid());
                statusRepo.save(statusInfo);

                //hospitalRepo.save(hospitalInfo);
                return RestResp.success("授权成功！");
            } else {
                return RestResp.fail("无人申请！");
            }
        }else {
            return RestResp.fail();
        }
    }

    //15 不处理请求
    public RestResp noSolveRequest(Hospital hospital){

        Status statusInfo = statusRepo.findByUseridAndRecordid(hospital.getLoginid(), hospital.getRecordid());
        if (statusInfo != null){
            String status = statusInfo.getPermissionstatus();
            if (status.equals("1")){
                status = "0";
                statusInfo.setPermissionstatus(status);
                statusRepo.save(statusInfo);
                return RestResp.success("拒绝申请！");
            } else {
                return RestResp.fail("操作失败");
            }
        }else {
            return RestResp.fail();
        }
    }

    // 医院查自己（假数据）
    public RestResp getHospitalRecord(String providerid) {
        List<Hospital> hospitalsList = hospitalRepo.findByProviderid(providerid);
        if(!hospitalsList.isEmpty() && hospitalsList.size() != 0){
            return RestResp.success(hospitalsList);
        }else {
            return RestResp.fail();
        }
    }

    // 医院输入用户身份证点击-搜索，获取病例列表
    public RestResp searchPatientRecord(String ownerid, String loginname){
        List<Hospital> hospitalsList = hospitalRepo.findByOwnerid(ownerid);
        if(null != hospitalsList && hospitalsList.size() != 0){
            for(int i = 0; i < hospitalsList.size(); i++){
                Hospital hospitalInfo = hospitalsList.get(i);
                Status statusInfo = statusRepo.findByUseridAndRecordid(loginname,hospitalInfo.getRecordid());
                if(null != statusInfo){
                    hospitalInfo.setStatus(statusInfo);
                }else {
                    statusInfo.setUserid(loginname);
                    statusInfo.setPermissionstatus("0");
                    statusInfo.setRecordid(hospitalInfo.getRecordid());
                }
                statusRepo.save(statusInfo);

                hospitalInfo.setLoginid(loginname);

                hospitalRepo.save(hospitalInfo);
            }
            return RestResp.success(hospitalsList);
        }else {
            return RestResp.fail();
        }

    }


    // 消息通知页面返回的数据
    public RestResp getData(String ownerid){
        List<Status> statusList = (List<Status>) statusRepo.findAll();
        if(null != statusList && statusList.size() != 0){
            for (int i=0; i<statusList.size(); i++){
                String recordid = statusList.get(i).getRecordid();
                Hospital hospitalInfo = hospitalRepo.findByRecordid(recordid);
                statusList.get(i).setHospital(hospitalInfo);
            }
            return RestResp.success(statusList);
        }else {
            return RestResp.fail();
        }
    }

    // 医院点击记录查看详细
    public RestResp queryRecordDetails(Long id){
        RecordDetails recordDetails = recordDetailsRepo.findOne(id);
        if (recordDetails != null){
            return RestResp.success(recordDetails);
        }else {
            return RestResp.fail();
        }
    }

    // 病人系统，点击共享he查看，显示详细，选择给某个医院共享
    public RestResp showShareRecord(Long id){
        RecordDetails recordDetails = recordDetailsRepo.findOne(id);
        Hospital hospital = hospitalRepo.findById(id);
        recordDetails.setHospital(hospital);
        if (recordDetails != null){
            return RestResp.success("查询数据成功", recordDetails);
        }else {
            return RestResp.fail("查询数据失败");
        }
    }

    // 个人查看自己的病历列表
    public RestResp queryOwnerRecord(String ownerid){
        List<Hospital> hospitalList = hospitalRepo.findByOwnerid(ownerid);
        if (!hospitalList.isEmpty() && hospitalList.size() != 0){
            return RestResp.success(hospitalList);
        }else {
            return RestResp.fail();
        }
    }


    // 病人系统点击共享进入详细之后点击“共享”按钮
    public RestResp shareRecord(Hospital hospital){
        Hospital hospitalInfo = hospitalRepo.findByRecordidAndOwnerid(hospital.getRecordid(), hospital.getOwnerid());
//        Status statusInfo = statusRepo.findByRecordid(hospital.getRecordid());
        List<Status> statusList = statusRepo.findByRecordid(hospital.getRecordid());

        System.out.println("userid="+hospital.getUserid());
        System.out.println("recordid="+hospital.getRecordid());
        System.out.println("ownerid="+hospital.getOwnerid());
        System.out.println("dealline="+hospital.getDeadline());
        System.out.println("pertype="+hospital.getPermissiontype());

        Status statusInfo = statusRepo.findByUseridAndRecordid(hospital.getUserid(), hospital.getRecordid());
        if(hospitalInfo != null && statusList != null){
//            for (int i=0; i<statusList.size();i++){
                if (statusInfo.getPermissionstatus().equals("2") && statusInfo.getUserid().equals(hospital.getUserid())){
                    return RestResp.fail("此条记录已共享");
                }else {
                    hospitalInfo.setRecordid(hospital.getRecordid());
                    hospitalInfo.setOwnerid(hospital.getOwnerid());
                    hospitalInfo.setUserid(hospital.getUserid());// 给谁权限看，userid就是谁
                    hospitalInfo.setProviderid(hospital.getProviderid());
                    // hospitalInfo.setPermissiontype("permission_all");// 没有添加权限页面，暂时都是permission_all
                    hospitalInfo.setPermissiontype(hospital.getPermissiontype());
                    hospitalInfo.setDeadline(hospital.getDeadline());
                    hospitalInfo.setHealtime(hospital.getHealtime());
                    hospitalInfo.setHealailment(hospital.getHealailment());

                    statusInfo.setPermissionstatus("2");
                    statusInfo.setUserid(hospital.getUserid());
                    statusInfo.setRecordid(hospital.getRecordid());
                    try {
                        this.addPermission(hospital);
                    }catch (Exception e){
                        Log.error("添加权限失败", e);
                        return RestResp.fail("添加权限失败");
                    }
                    hospitalRepo.save(hospitalInfo);
                    statusRepo.save(statusList);

//                }
            }
            return RestResp.success("共享成功", hospitalInfo);
        }else {
            return RestResp.fail("没有这条记录");
        }
    }
}
