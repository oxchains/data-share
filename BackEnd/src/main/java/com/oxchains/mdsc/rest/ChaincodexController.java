package com.oxchains.mdsc.rest;

import com.google.gson.Gson;
import com.oxchains.mdsc.domain.PatientData;
import com.oxchains.mdsc.domain.RestResp;
import com.oxchains.mdsc.service.MdscxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping
    public RestResp reginster(@RequestParam String userId, String userName, String userInfo, String userType) {
        return mdscxService.register(userId, userName, userInfo, userType);
    }

    //TODO
    // patientInfo 需要修改
    @PutMapping(value = "/add/{ownerId}")
    public RestResp addRecord(@PathVariable("ownerId") String ownerId, String recordId, String providerId, String accessInfo, String patientInfo, String datahash) {
        if (patientInfo != null) patientInfo = patientInfo.replace(",", "__");
        return mdscxService.addRecord(recordId, ownerId, providerId, accessInfo, patientInfo, datahash);
    }

    @PutMapping(value = "/add/{ownerId}/{recordId}")
    public RestResp addPermission(@PathVariable("ownerId") String ownerId,
                                  @PathVariable("recordId") String recordId,
                                  String userId, String permissionType, String deadline) {
        return mdscxService.addPermission(recordId, ownerId, userId, permissionType, deadline);
    }

    @PutMapping(value = "/remove/{ownerId}/{recordId}/{userId}")
    public RestResp removePermission(@PathVariable("ownerId") String ownerId,
                                     @PathVariable("recordId") String recordId,
                                     @PathVariable("userId") String userId) {
        return mdscxService.removePermission(recordId, ownerId, userId);
    }

    @PutMapping(value = "/update/{providerId}/{recordId}")
    public RestResp updateAccessInfo(@PathVariable("providerId") String providerId,
                                     @PathVariable("recordId") String recordId,
                                     String accessInfo) {
        return mdscxService.updateAccessInfo(recordId, providerId, accessInfo);
    }

    @GetMapping(value = "/query/{userId}/{recordId}")
    public RestResp getRecord(@PathVariable("userId") String userId,
                              @PathVariable("recordId") String recordId) {
        return mdscxService.getRecord(recordId, userId);
    }

    @GetMapping(value = "/query/{userId}")
    public RestResp getSummary(@PathVariable("userId") String userId) {
        return mdscxService.getSummary(userId);
    }

    @GetMapping(value = "/check/{providerId}/{recordId}/{userId}")
    public RestResp havePermissionProvider(@PathVariable("providerId") String providerId, @PathVariable("recordId") String recordId,
                                           @PathVariable("userId") String userId) {
        return mdscxService.havePermissionProvider(recordId, providerId, userId);
    }

    @GetMapping(value = "/check/{userId}/{recordId}")
    public RestResp havePermissionUser(@PathVariable("userId") String userId,
                                       @PathVariable("recordId") String recordId) {
        return mdscxService.havePermissionUser(recordId, userId);
    }

    @PutMapping(value = "/buy/{userId}/{recordId}")
    public RestResp buyForRecord(@PathVariable("userId") String userId,
                                 @PathVariable("recordId") String recordId,
                                 String deadline) {
        return mdscxService.buyForRecord(recordId, userId, deadline);
    }

    @PutMapping(value = "/set/{owerId}/{recordId}")
    public RestResp setShareItem(@PathVariable("owerId") String owerId,
                                 @PathVariable("recordId") String recordId,
                                 String patientdata) {

        List<PatientData> patientdatas = new ArrayList<>();

        patientdatas.add(new PatientData("cy", true, 111));
        patientdatas.add(new PatientData("27", true, 101));
        Map<String, PatientData> map = new HashMap();
        map.put("name", new PatientData("name", true, 111));
        map.put("sex", new PatientData("sex", true, 101));
        map.put("age", new PatientData("age", true, 121));
        Gson gson = new Gson();
        //patientdata=gson.toJson(map);
        return mdscxService.setShareItem(recordId, owerId, patientdata);
    }
}
