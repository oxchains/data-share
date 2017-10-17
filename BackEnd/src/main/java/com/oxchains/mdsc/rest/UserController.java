package com.oxchains.mdsc.rest;

import com.oxchains.mdsc.data.HospitalRepo;
import com.oxchains.mdsc.data.UserRepo;
import com.oxchains.mdsc.domain.CompanyUser;
import com.oxchains.mdsc.domain.Hospital;
import com.oxchains.mdsc.domain.User;
import com.oxchains.mdsc.rest.domain.RestResp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author aiet
 */
@RestController
@RequestMapping("/user")
public class UserController {

    private Logger LOG = LoggerFactory.getLogger(getClass());

    private UserRepo userRepo;
    private ChaincodexController chaincodexController;

    public UserController(@Autowired UserRepo userRepo, @Autowired ChaincodexController chaincodexController) {
        this.userRepo = userRepo;
        this.chaincodexController = chaincodexController;
    }

    @PostMapping
    public RestResp registerUser(@RequestBody User user) {
        return userRepo
          .findByName(user.getName())
          .map(u -> RestResp.fail("账号已存在"))
          .orElseGet(() -> {
              //============注册系统账号的时候同时注册区块链信息，如果区块链有信息返回失败======
              chaincodexController.bindRegister_user(user);
              //==============================
              User u = userRepo.save(user);
              LOG.info("{} registered", u);
              return RestResp.success(u.getName());
          });
    }

    @PostMapping(value = "/test")
    public RestResp registerUserTest(@RequestBody User user) {
        return userRepo
                .findByName(user.getName())
                .map(u -> RestResp.fail("账号已存在"))
                .orElseGet(() -> {
                    User u = userRepo.save(user);
                    LOG.info("{} registered", u);
                    return RestResp.success(u.getName());
                });
    }


}
