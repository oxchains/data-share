package com.oxchains.mdsc.rest;

import com.oxchains.mdsc.auth.JwtService;
import com.oxchains.mdsc.data.*;
import com.oxchains.mdsc.domain.CompanyUser;
import com.oxchains.mdsc.domain.Hospital;
import com.oxchains.mdsc.domain.User;
import com.oxchains.mdsc.domain.UserToken;
import com.oxchains.mdsc.rest.domain.NameAndPass;
import com.oxchains.mdsc.rest.domain.RestResp;
import groovy.util.logging.Slf4j;
import org.hibernate.hql.internal.ast.tree.RestrictableStatement;
import org.jruby.RubyProcess;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author aiet
 */
@RestController
@RequestMapping("/token")
public class TokenController {

    private Logger LOG = LoggerFactory.getLogger(getClass());

    private UserRepo userRepo;
    private CompanyUserRepo companyUserRepo;
    private UserTokenRepo userTokenRepo;
    private JwtService jwtService;
    private ResearchRepo researchRepo;
    private HospitalRepo hospitalRepo;

    public TokenController(@Autowired CompanyUserRepo companyUserRepo, @Autowired UserRepo userRepo, @Autowired UserTokenRepo userTokenRepo, @Autowired JwtService jwtService, @Autowired ResearchRepo researchRepo, @Autowired HospitalRepo hospitalRepo) {
        this.userRepo = userRepo;
        this.companyUserRepo = companyUserRepo;
        this.userTokenRepo = userTokenRepo;
        this.jwtService = jwtService;
        this.researchRepo = researchRepo;
        this.hospitalRepo = hospitalRepo;
    }

    @PostMapping
    public RestResp enroll(@RequestBody NameAndPass user) {
        return (user.isBiz() ? companyUserRepo
          .findByNameAndPassword(user.getUsername(), user.getPassword())
          .map(CompanyUser::toUser) : userRepo.findByNameAndPassword(user.getUsername(), user.getPassword()))
          .map(u -> {
              UserToken userToken = new UserToken(jwtService.generate(u, user.isBiz()));
              LOG.info("{} enrolled", user.getUsername());
              //================================
              /*List<Hospital> hospitalList = (List<Hospital>) hospitalRepo.findAll();
              for (int i=0; i<hospitalList.size(); i++){
                  hospitalList.get(i).setLoginid(user.getUsername());
              }
              hospitalRepo.save(hospitalList);*/
              //==================================
              return RestResp.success(userTokenRepo.save(userToken));
          })
          .orElse(RestResp.fail());
        /*.
            if (user.isBiz()){
                return companyUserRepo.findByNameAndPassword(user.getUsername(), user.getPassword()).map(CompanyUser::toUser).map(u -> {
                    UserToken userToken = new UserToken(jwtService.generate(u, user.isBiz()));
                    UserToken ut = userTokenRepo.save(userToken);
                    return RestResp.success(ut);
                }).orElse(RestResp.fail());
            } else {
                return userRepo.findByNameAndPassword(user.getUsername(), user.getPassword()).map(u -> {
                    UserToken userToken = new UserToken(jwtService.generate(u, user.isBiz()));
                    UserToken ut = userTokenRepo.save(userToken);
                    return RestResp.success(ut);
                }).orElse(RestResp.fail());
            }
        */
        /*if(user.userLogin == 0){
            System.err.println(user.userLogin);
            return companyUserRepo.findByNameAndPassword(user.getUsername(), user.getPassword()).map(CompanyUser::toUser).map(u -> {
                UserToken userToken = new UserToken(jwtService.generate3(u));
                UserToken ut = userTokenRepo.save(userToken);
                return RestResp.success(ut);
            }).orElse(RestResp.fail());
        }else if (user.companyLogin == 1){
            return userRepo.findByNameAndPassword(user.getUsername(), user.getPassword()).map(u -> {
                UserToken userToken = new UserToken(jwtService.generate3(u));
                UserToken ut = userTokenRepo.save(userToken);
                return RestResp.success(ut);
            }).orElse(RestResp.fail());
        }else if(user.researchLogin == 2){
            return researchRepo.findByNameAndPassword(user.getUsername(), user.getPassword()).map(u -> {
                UserToken userToken = new UserToken(jwtService.generate3(u));
                UserToken ut = userTokenRepo.save(userToken);
                return RestResp.success(ut);
            }).orElse(RestResp.fail());
        }else {
            return RestResp.fail();
        }*/
    }

    // 第三方研究机构登录
    @PostMapping(value = "/research")
    public RestResp login(@RequestBody NameAndPass user){
        return researchRepo.findByNameAndPassword(user.getUsername(), user.getPassword()).map(u -> {
            UserToken userToken = new UserToken(jwtService.generate2(u));
            LOG.info("{} login", user.getUsername());
            userToken = userTokenRepo.save(userToken);
            return RestResp.success(userToken);
        }).orElse(RestResp.fail());
    }

}
