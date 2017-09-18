package com.oxchains.mdsc.service;

import com.oxchains.mdsc.domain.ChaincodeResp;
import com.oxchains.mdsc.domain.FabricAccount;
import com.oxchains.mdsc.util.ConstantUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

import static com.oxchains.mdsc.util.ResponseUtil.extract;
import static com.oxchains.mdsc.util.ResponseUtil.resolve;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpMethod.GET;

@Service
public class ChaincodeService {
    @Value("${fabric.uri.tx}")
    private String txUri;
    @Value("${fabric.uri}")
    private String uri;
    @Value("${fabric.username}")
    private String username;
    @Value("${fabric.password}")
    private String password;
    @Value("${fabric.affiliation}")
    private String affiliation;

    private HttpHeaders httpHeaders;
    private RestTemplate restTemplate;

    private Logger LOG = LoggerFactory.getLogger(getClass());

    @Scheduled(fixedRate = 1000 * 3600 * 72)
    void token() {
        String resp = new RestTemplate().postForObject(uri + "/user/token", new FabricAccount(username, password, affiliation), String.class);
        Optional<String> tokenOptional = extract(resp, "/data/token");
        if (tokenOptional.isPresent()) {
            ConstantUtil.AUTH_USER_TOKEN = tokenOptional.get();
            String token = "Bearer " + tokenOptional.get();
            LOG.info("refreshed access token for fabric manager: {}", token);
            this.httpHeaders.set(AUTHORIZATION, token);
        } else throw new IllegalStateException("system failed to init: cannot get token from fabric manager!");
    }

    public ChaincodeService() {
        this.httpHeaders = new HttpHeaders();
        this.restTemplate = new RestTemplate();
    }

    public Optional<ChaincodeResp> invoke(String args) {
        String url = String.format("%s%s", txUri, args);
        String res = restTemplate.postForObject(url, new HttpEntity<>(httpHeaders), String.class);
        //restTemplate.post
        Optional<ChaincodeResp> optional = extract(res, "/data").map(data -> resolve(data, ChaincodeResp.class));
        return optional;
        //return extract(restTemplate.postForObject(String.format("%s%s", txUri, args), new HttpEntity<>(this.httpHeaders), String.class), "/data").map(data -> resolve(data, ChaincodeResp.class));
    }

    public Optional<ChaincodeResp> invoke(String method, String args) {
        args = String.format("%s,%s", method, args);
        return invoke(args);
    }

    public Optional<ChaincodeResp> query(String args) {
        String url = String.format("%s%s", txUri, args);
        ResponseEntity<String> res = restTemplate.exchange(url, GET, new HttpEntity<>(httpHeaders), String.class);
        String resBody = res.getBody();
        Optional<ChaincodeResp> optional = extract(resBody, "/data").map(data -> resolve(data, ChaincodeResp.class));
        return optional;
        //return extract(restTemplate.exchange(url,GET,new HttpEntity<>(httpHeaders),String.class).getBody(),"/data").map(data-> resolve(data,ChaincodeResp.class));
    }

    public Optional<ChaincodeResp> query(String method, String args) {
        args = String.format("%s,%s", method, args);
        return query(args);
    }

}
