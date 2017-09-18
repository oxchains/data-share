package com.oxchains.mdsc.rest;

import com.google.gson.Gson;
import com.oxchains.mdsc.domain.ChaincodeResp;
import com.oxchains.mdsc.domain.PatientData;
import com.oxchains.mdsc.domain.RestResp;
import com.oxchains.mdsc.service.ChaincodeService;
import com.oxchains.mdsc.service.MdscService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chaincode")
public class ChaincodeController {
    @Resource
    private MdscService mdscService;

    @GetMapping(value = "/hello")
    public RestResp addRecord(String message) {
        return RestResp.success("hello test controller " + message, null);
    }

    @PostMapping
    public RestResp reginster(@RequestParam String userId, String userName, String userInfo, String userType) {
        return mdscService.register(userId, userName, userInfo, userType);
    }

    //TODO
    // patientInfo 需要修改
    @PutMapping(value = "/add/{ownerId}")
    public RestResp addRecord(@PathVariable("ownerId") String ownerId, String recordId, String providerId, String accessInfo, String patientInfo, String datahash) {
        if (patientInfo != null) patientInfo = patientInfo.replace(",", "__");
        return mdscService.addRecord(recordId, ownerId, providerId, accessInfo, patientInfo, datahash);
    }

    @PutMapping(value = "/add/{ownerId}/{recordId}")
    public RestResp addPermission(@PathVariable("ownerId") String ownerId,
                                  @PathVariable("recordId") String recordId,
                                  String userId, String permissionType, String deadline) {
        return mdscService.addPermission(recordId, ownerId, userId, permissionType, deadline);
    }

    @PutMapping(value = "/remove/{ownerId}/{recordId}/{userId}")
    public RestResp removePermission(@PathVariable("ownerId") String ownerId,
                                     @PathVariable("recordId") String recordId,
                                     @PathVariable("userId") String userId) {
        return mdscService.removePermission(recordId, ownerId, userId);
    }

    @PutMapping(value = "/update/{providerId}/{recordId}")
    public RestResp updateAccessInfo(@PathVariable("providerId") String providerId,
                                     @PathVariable("recordId") String recordId,
                                     String accessInfo) {
        return mdscService.updateAccessInfo(recordId, providerId, accessInfo);
    }

    @GetMapping(value = "/query/{userId}/{recordId}")
    public RestResp getRecord(@PathVariable("userId") String userId,
                              @PathVariable("recordId") String recordId) {
        return mdscService.getRecord(recordId, userId);
    }

    @GetMapping(value = "/query/{userId}")
    public RestResp getSummary(@PathVariable("userId") String userId) {
        return mdscService.getSummary(userId);
    }

    @GetMapping(value = "/check/{providerId}/{recordId}/{userId}")
    public RestResp havePermissionProvider(@PathVariable("providerId") String providerId, @PathVariable("recordId") String recordId,
                                           @PathVariable("userId") String userId) {
        return mdscService.havePermissionProvider(recordId, providerId, userId);
    }

    @GetMapping(value = "/check/{userId}/{recordId}")
    public RestResp havePermissionUser(@PathVariable("userId") String userId,
                                       @PathVariable("recordId") String recordId) {
        return mdscService.havePermissionUser(userId, recordId);
    }

    @PutMapping(value = "/buy/{userId}/{recordId}")
    public RestResp buyForRecord(@PathVariable("userId") String userId,
                                 @PathVariable("recordId") String recordId,
                                 String deadline) {
        return mdscService.buyForRecord(recordId, userId, deadline);
    }

    //TODO
    //dataItem itemIngegral 参数需要修改
    @PutMapping(value = "/set/{owerId}/{recordId}")
    public RestResp setShareItem(@PathVariable("owerId") String owerId,
                                 @PathVariable("recordId") String recordId,
                                 String dataItem, String itemIngegral) {

        List<PatientData> patientdatas = new ArrayList<>();
        for (int i = 0; i < 2; i++) {
            PatientData p = new PatientData("name", true, i + 100);
            patientdatas.add(p);
        }
        Gson gson = new Gson();
        String patientdata = gson.toJson(patientdatas);
        //patientdata="[{\"Item\":\"name\",\"Flag\":true,\"Ingegral\":100},{\"Item\":\"sex\",\"Flag\":true,\"Ingegral\":100},{\"Item\":\"age\",\"Flag\":false,\"Ingegral\":100}]";
//      return mdscService.setShareItem(recordId,owerId,patientdata);
        return mdscService.setShareItemString(recordId, owerId, "cy__27", "2000__2000");
    }

}