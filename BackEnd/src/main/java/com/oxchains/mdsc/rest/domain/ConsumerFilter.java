package com.oxchains.mdsc.rest.domain;

import com.alibaba.dubbo.common.Constants;
import com.alibaba.dubbo.common.extension.Activate;
import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.rpc.*;
import com.oxchains.mdsc.util.ConstantUtil;
import groovy.util.logging.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import oxchains.fabric.console.domain.User;
import oxchains.fabric.console.domain.UserToken;
import oxchains.fabric.console.service.UserService;

@Activate(group = {Constants.CONSUMER})
@Slf4j
public class ConsumerFilter implements Filter {
    @Value("${fabric.username}")
    private String username;
    @Value("${fabric.password}")
    private String password;
    @Value("${fabric.affiliation}")
    private String affiliation;

    @Reference(version = "1.0.0", timeout = 30000)
    private UserService userService;

    private static final Logger log = LoggerFactory.getLogger(ConsumerFilter.class);

    @Override
    public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
        log.debug("===ConsumerFilter===begin===" + invocation.getMethodName());
        log.debug("===url===" + invoker.getUrl());
        if (!"enrollUser".equals(invocation.getMethodName())) {
            //String token="eyJhbGciOiJFUzI1NiJ9.eyJqdGkiOiIxNDI2MTI3ZC0xMjUzLTRjODAtODIxOS1hNmZlOGViYTEwMjAiLCJzdWIiOiJhZG1pbiIsImV4cCI6MTUwNDc2NDUxNSwiYXV0aG9yaXR5IjoiTUFOQUdFIiwiYWZmaWxpYXRpb24iOiJvcmcxIn0.mO6jSrgXgbykQVUH5kjeAShIysapcM12wVcHB5L5ItBMQaniXZObsX6BT4i3HkCTFSCd3v2Cyy6O1AIxDEEcJQ";
            //token="eyJhbGciOiJFUzI1NiJ9.eyJqdGkiOiI3YmNmYzg1ZS04YzJlLTQ3MDEtOTY2YS1hOTM5MjczZDYzNjYiLCJzdWIiOiJhZG1pbiIsImV4cCI6MTUwNTI3OTk1MiwiYXV0aG9yaXR5IjoiTUFOQUdFIiwiYWZmaWxpYXRpb24iOiJvcmcxIn0.QkJEAFHHe2-oOdZBdMONjCtjVLXtmSJmZfe3yfTX3sWcOyUxjXuCB5o-hwIRe9j2fQjkK5DYtELAve-8_wWYJg";
            if (ConstantUtil.AUTH_USER_TOKEN == null && !getUserToken()) {
                log.error("token :", "无法获取token");
            }
            RpcContext.getContext().setAttachment("authentication", ConstantUtil.AUTH_USER_TOKEN);
        }
        Result result = invoker.invoke(invocation);
        log.debug("===ConsumerFilter===end===" + invocation.getMethodName());
        return result;
    }

    //获取token
    private boolean getUserToken() {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setAffiliation(affiliation);
        UserToken token = userService.enrollUser(user);
        if (token != null && token.getToken() != null && !"".equals(token.getToken())) {
            ConstantUtil.AUTH_USER_TOKEN = token.getToken();
            return true;
        }
        return false;
    }
}