package com.oxchains.mdsc.rest;

import com.oxchains.mdsc.data.CompanyRepo;
import com.oxchains.mdsc.data.CompanyUserRepo;
import com.oxchains.mdsc.data.HospitalRepo;
import com.oxchains.mdsc.data.ResearchRepo;
import com.oxchains.mdsc.domain.Company;
import com.oxchains.mdsc.domain.CompanyUser;
import com.oxchains.mdsc.domain.Research;
import com.oxchains.mdsc.rest.domain.RestResp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author aiet
 */
@RestController
@RequestMapping("/research")
public class ResearchController {

    private Logger LOG = LoggerFactory.getLogger(getClass());

    private ResearchRepo researchRepo;
    private ChaincodexController chaincodexController;

    public ResearchController(@Autowired ResearchRepo researchRepo, @Autowired ChaincodexController chaincodexController) {
        this.researchRepo = researchRepo;
        this.chaincodexController = chaincodexController;
    }

    @PostMapping
    public RestResp registerResearch(@RequestBody Research research) {
        return researchRepo
          .findByName(research.getName())
          .map(c -> RestResp.fail())
          .orElseGet(() -> {
              //============注册系统账号的时候同时注册区块链信息，如果区块链有信息返回失败======
              chaincodexController.bindRegister_research(research);
              //==============================
              Research saved = researchRepo.save(research);
              LOG.info("research {} registered", saved);
              return RestResp.success(research);
          });
    }

    @GetMapping
    public RestResp list() {
        return RestResp.success(researchRepo.findAll());
    }

}
