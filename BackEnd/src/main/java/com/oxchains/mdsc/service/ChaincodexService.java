package com.oxchains.mdsc.service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.oxchains.mdsc.domain.RestResp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import oxchains.fabric.console.rest.common.QueryResult;
import oxchains.fabric.console.rest.common.TxPeerResult;
import oxchains.fabric.console.service.ChaincodesService;

import java.util.Optional;

import static com.oxchains.mdsc.domain.RestResp.fail;

@Service
public class ChaincodexService {
    private static final Logger log = LoggerFactory.getLogger(ChaincodexService.class);
    @Value("${fabric.chain}")
    private String chain;
    @Value("${fabric.chaincode}")
    private String chaincode;
    @Value("${fabric.chaincode.version}")
    private String chaincodeVersion;


    @Reference(version = "1.0.0", timeout = 30000)
    private ChaincodesService chaincodesService;

    private Optional<TxPeerResult> invokecc(String chain, String chaincode, String version, String[] args) {
        TxPeerResult result = chaincodesService.invokecc(chain, chaincode, version, args);
        return Optional.of(result);
    }

    private Optional<QueryResult> querycc(String chain, String chaincode, String version, String[] args) {
        QueryResult result = null;
        try {
            result = chaincodesService.querycc(chain, chaincode, version, args);
        } catch (Exception e) {
            result = new QueryResult();
            log.error("querycc :" ,e);
        }
        return Optional.of(result);
    }

    public RestResp invoke(String... args) {
        return invokecc(chain, chaincode, chaincodeVersion, args).map(result -> {
            if (result.getSuccess() == 1) {
                return RestResp.success("操作成功", result);
            } else {
                return fail("操作失败", result);
            }
        }).orElse(fail("操作失败"));
    }

    public RestResp query(String... args) {
        return querycc(chain, chaincode, chaincodeVersion, args).map(result -> {
            if (result.getTxid() != null && !"".equals(result.getTxid())) {
                return RestResp.success("查询数据成功", result.getPayload());
            } else {
                return fail("获取数据失败");
            }
        }).orElse(fail("获取数据失败"));
        //return querycc(chain,chaincode,chaincodeVersion,args).map(RestResp::success).orElse(fail());

    }


}
