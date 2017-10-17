package com.oxchains.mdsc.rest;

import com.google.gson.Gson;
import com.oxchains.mdsc.auth.JwtAuthentication;
import com.oxchains.mdsc.data.CompanyUserRepo;
import com.oxchains.mdsc.data.UserRepo;
import com.oxchains.mdsc.domain.*;
import com.oxchains.mdsc.rest.domain.PatientData;
import com.oxchains.mdsc.rest.domain.RestResp;
import com.oxchains.mdsc.service.MdscxService;
import org.hibernate.hql.internal.ast.tree.RestrictableStatement;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.*;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

/**
 *  ownerId  患者
 *  providerId  医院
 *  userId 患者 医院 第三方机构...
 */

@RestController
@RequestMapping("/chaincodex")
public class ChaincodexController {
    @Resource
    private MdscxService mdscxService;

    private Optional<User> userContext(){
        return ((JwtAuthentication) getContext().getAuthentication()).user();
    }

    @PostMapping(value = "/register")
    public RestResp register(@RequestBody Hospital hospital) {
        return mdscxService.register(hospital);
    }

    // 两种注册绑定到一块
    public RestResp bindRegister_user(User user) {
        return mdscxService.bindRegister_user(user);
    }

    // 两种注册绑定到一块
    public RestResp bindRegister_company(CompanyUser companyUser) {
        return mdscxService.bindRegister_company(companyUser);
    }

    // 第三方研究机构
    public RestResp bindRegister_research(Research research) {
        return mdscxService.bindRegister_research(research);
    }

    @PutMapping(value = "/addRecord")
    public RestResp addRecord(@RequestBody Hospital hospital) {
        String patientInfo = hospital.getPatientinfo();
        if(patientInfo != null) {
            patientInfo = patientInfo.replace(",","__");
        }
        return mdscxService.addRecord(hospital);
    }


    @PutMapping(value = "/addPermission")
    public RestResp addPermission(@RequestBody Hospital hospital) {
        return mdscxService.addPermission(hospital);
    }

    @PutMapping(value = "/removePermission")
    public RestResp removePermission(@RequestBody Hospital hospital) {
        return mdscxService.removePermission(hospital);
    }

    @PutMapping(value = "/updateAccessInfo")
    public RestResp updateAccessInfo(@RequestBody Hospital hospital) {
        return mdscxService.updateAccessInfo(hospital);
    }

    @PostMapping(value = "/query/getRecord")
    public RestResp getRecord(@RequestBody Hospital hospital) {
        return mdscxService.getRecord(hospital);
    }

    @GetMapping(value = "/query/{userId}")
    public RestResp getSummary(@PathVariable("userId") String userId) {
        return mdscxService.getSummary(userId);
    }

    @PostMapping(value = "/check/havePermissionProvider")
    public RestResp havePermissionProvider(@RequestBody Hospital hospital) {
        return mdscxService.havePermissionProvider(hospital);
    }

    @GetMapping(value = "/check/havePermissionUser")
    public RestResp havePermissionUser(@RequestParam String recordId, @RequestParam String userId) {
        return mdscxService.havePermissionUser(recordId, userId);
    }

    @PutMapping(value = "/buy/record")
    public RestResp buyForRecord(@RequestBody Hospital hospital) {
        return mdscxService.buyForRecord(hospital);
    }

    @PutMapping(value = "/set/shareItem")
    public RestResp setShareItem(@RequestBody Hospital hospital) {

        List<PatientData> patientdatas = new ArrayList<>();

        patientdatas.add(new PatientData("cy", true, 111));
        patientdatas.add(new PatientData("27", true, 101));
        Map<String, PatientData> map = new HashMap();
        map.put("name", new PatientData("name", true, 111));
        map.put("sex", new PatientData("sex", true, 101));
        map.put("age", new PatientData("age", true, 121));
        Gson gson = new Gson();
        //patientdata=gson.toJson(map);
        return mdscxService.setShareItem(hospital);
    }

    // 请求权限
    @PostMapping(value = "/request/permission")
    public RestResp requestPermission(@RequestBody Hospital hospital) {
        return mdscxService.requestPermission(hospital);
    }

    // 处理请求
    @PostMapping(value = "/deal")
    public RestResp solveRequest(@RequestBody Hospital hospital){
        return mdscxService.solveRequest(hospital);
    }

    // 不处理请求
    @PostMapping(value = "/nodeal")
    public RestResp noSolveRequest(@RequestBody Hospital hospital){
        return mdscxService.noSolveRequest(hospital);
    }

    // 医院查看自己医院的病历
    @GetMapping(value = "/queryHospitalRecord/{providerid}")
    public RestResp getHospitalRecord(@PathVariable String providerid) {
        return mdscxService.getHospitalRecord(providerid);
    }

    // 医院自己的id和用户的id获取病例信息-搜索
    @GetMapping(value = "/searchPatientRecord/{ownerid}/{loginname}")
    public RestResp searchPatientRecord(@PathVariable String ownerid, @PathVariable String loginname){
        return mdscxService.searchPatientRecord(ownerid, loginname);
    }

    // 消息通知页面获取数据
    @GetMapping(value = "/getMessageData/{ownerid}")
    public RestResp getData(@PathVariable String ownerid){
        return mdscxService.getData(ownerid);
    }

    // 医院点击记录查看详细
    @GetMapping(value = "/queryRecordDetails")
    public RestResp queryRecordDetails(@RequestParam Long id){
        return mdscxService.queryRecordDetails(id);
    }

    // 病人系统，点击共享he查看，显示详细，选择给某个医院共享
    @GetMapping(value = "/showShareRecord")
    public RestResp showShareRecord(@RequestParam Long id){
        return mdscxService.showShareRecord(id);
    }

    // 个人查看自己的病历列表，无视权限，只要是自己的ownerid就可以查看
    @GetMapping(value = "/query/ownerRecord")
    public RestResp queryOwnerRecord(@RequestParam String ownerid){
        return mdscxService.queryOwnerRecord(ownerid);
    }

    // 病人系统点击共享进入详细之后点击“共享”按钮
    @PostMapping("/shareRecord")
    public RestResp shareRecord(@RequestBody Hospital hospital){
        return mdscxService.shareRecord(hospital);
    }

}
