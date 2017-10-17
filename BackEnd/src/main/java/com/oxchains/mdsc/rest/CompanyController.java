package com.oxchains.mdsc.rest;

import com.oxchains.mdsc.data.CompanyRepo;
import com.oxchains.mdsc.data.CompanyUserRepo;
import com.oxchains.mdsc.data.HospitalRepo;
import com.oxchains.mdsc.domain.Company;
import com.oxchains.mdsc.domain.CompanyUser;
import com.oxchains.mdsc.domain.Hospital;
import com.oxchains.mdsc.rest.domain.RestResp;
import org.jruby.RubyProcess;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * @author aiet
 */
@RestController
@RequestMapping("/company")
public class CompanyController {

    private Logger LOG = LoggerFactory.getLogger(getClass());

    private CompanyUserRepo companyUserRepo;
    private CompanyRepo companyRepo;
    private ChaincodexController chaincodexController;

    public CompanyController(@Autowired CompanyUserRepo companyUserRepo, @Autowired CompanyRepo companyRepo, @Autowired HospitalRepo hospitalRepo, @Autowired ChaincodexController chaincodexController) {
        this.companyUserRepo = companyUserRepo;
        this.companyRepo = companyRepo;
        this.chaincodexController = chaincodexController;
    }

    @PostMapping
    public RestResp registerCompany(@RequestBody CompanyUser companyUser) {
        return companyUserRepo
          .findByName(companyUser.getName())
          .map(c -> RestResp.fail())
          .orElseGet(() -> {
              //============注册系统账号的时候同时注册区块链信息，如果区块链有信息返回失败======
              chaincodexController.bindRegister_company(companyUser);
              //==============================
              Company savedCompany = companyRepo.save(companyUser.getCompany());
              companyUser.setCompany(savedCompany);
              CompanyUser saved = companyUserRepo.save(companyUser);
              LOG.info("company {} registered", saved);
              return RestResp.success(savedCompany);
          });
    }

    @GetMapping
    public RestResp list() {
        return RestResp.success(companyRepo.findAll());
    }

}
