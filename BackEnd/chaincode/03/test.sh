#测试运行文档
#使用前请根据自己的环境设置相应的变量路径.
#特别是channelpath和chaincodepath(默认从$GOPATH/src/下开始查找)
: ${CHANNEL_NAME:="mychannel"}
: ${CHANNEL_PATH:="./crypto/channel.tx"}
: ${CHAINCODE_PATH:="github.com/hyperledger/fabric/peer/hospital"}
: ${CHAINCODE_NAME:="mycc"}
verifyResult () {
	if [ $1 -ne 0 ] ; then
		echo "!!!!!!!!!!!!!!! "$2" !!!!!!!!!!!!!!!!"
                echo "================== ERROR !!! =================="
		echo
   		exit 1
	fi
}

createChannel(){
    peer channel create -o orderer.example.com:7050 -c $CHANNEL_NAME -f $CHANNEL_PATH >&log.txt
    res=$?
    cat log.txt
    verifyResult $res "Channel creation failed!"
    echo "=====================chanel \"$CHANNEL_NAME\" is created successfully ======================="
    echo
}

joinChannel(){
    peer channel join -b $CHANNEL_NAME.block >&log.txt
    res=$?
    cat log.txt
    verifyResult $res "Channel join failed!"
    echo "==========================peer joined on the channel======================================="
    sleep 2
    echo
}

installChaincode(){
    peer chaincode install -p $CHAINCODE_PATH -n $CHAINCODE_NAME -v 1.0 >&log.txt
    res=$?
    cat log.txt
    verifyResult $res "Chaincode install failed!"
    echo "================================chaincode install success ======================="
    echo
}

instantiateChaincode(){
    peer chaincode instantiate -o orderer.example.com:7050 -C $CHANNEL_NAME -n $CHAINCODE_NAME -v 1.0 -c '{"Args":[]}' >&log.txt
    res=$?
    cat log.txt
    verifyResult $res "instantiate chaincode failed"
    echo "=================================chaincode instantiate success======================="
    echo
    sleep 5
}

chaincodeInvoke(){
    ARGS=$1
    peer chaincode invoke -o orderer.example.com:7050 -C $CHANNEL_NAME -n $CHAINCODE_NAME -c $ARGS >&log.txt
    res=$?
    cat log.txt
    verifyResult $res "Invoke execution failed: \"$ARGS\""
    echo "=============================Invoke execution success: \"$ARGS\"==================================="
    echo
    sleep 3
}

chaincodeQuery(){
    ARGS=$1
    peer chaincode query -o orderer.example.com:7050 -C $CHANNEL_NAME -n $CHAINCODE_NAME -c $ARGS >&log.txt
    res=$?
    cat log.txt
    verifyResult $res "query execution failed: \"$ARGS\""
    echo "=============================query execution success: \"$ARGS\"==================================="
    echo
    sleep 2
}

echo "create channel"
createChannel

echo "join channel"
joinChannel

echo "installChaincode"
installChaincode

echo "instantiateChaincode"
instantiateChaincode

echo "chaincodeInvoke"

chaincodeInvoke '{"Args":["register","hospital11_1","医院1","甲级医院","user_hospital"]}'
具体在链上的操作如下：
docker exec -it peer0.org1.example.com bash
peer chaincode invoke -C mychannel -o orderer.example.com:7050 -n hospital1 -c '{"Args":["register","hospital11_1","channel1","channel","user_hospital"]}'

chaincodeInvoke '{"Args":["register","hospital_2","医院2","乙级医院","user_hospital"]}'

chaincodeInvoke '{"Args":["register","liming","黎明","三号学生","user_person"]}'

chaincodeInvoke '{"Args":["register","research_1","研究机构","1所","user_research"]}'

chaincodeInvoke '{"Args":["addRecord","record_1","liming","hospital_1","数据哭连接","name,sex,age","LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHRENDQWIrZ0F3SUJBZ0lRRHgrU0VoK08rTWNGcElSWFdlYUNoakFLQmdncWhrak9QUVFEQWpCek1Rc3cKQ1FZRFZRUUdFd0pWVXpFVE1CRUdBMVVFQ0JNS1EyRnNhV1p2Y201cFlURVdNQlFHQTFVRUJ4TU5VMkZ1SUVaeQpZVzVqYVhOamJ6RVpNQmNHQTFVRUNoTVFiM0puTVM1bGVHRnRjR3hsTG1OdmJURWNNQm9HQTFVRUF4TVRZMkV1CmIzSm5NUzVsZUdGdGNHeGxMbU52YlRBZUZ3MHhOekE0TVRnd09ESTJNVGxhRncweU56QTRNVFl3T0RJMk1UbGEKTUZzeEN6QUpCZ05WQkFZVEFsVlRNUk13RVFZRFZRUUlFd3BEWVd4cFptOXlibWxoTVJZd0ZBWURWUVFIRXcxVApZVzRnUm5KaGJtTnBjMk52TVI4d0hRWURWUVFEREJaQlpHMXBia0J2Y21jeExtVjRZVzF3YkdVdVkyOXRNRmt3CkV3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFNTNxRzJyYVBUa2NHRVpkVGExK0dhOWNIcndvN096OU0KQ2hRb2htb2ZlUmNMZ2ZFSG1RYlN4QnZ2N1NMcFpmcmtBN3JBWmY1alhBWW5rREREb2xlTmxhTk5NRXN3RGdZRApWUjBQQVFIL0JBUURBZ2VBTUF3R0ExVWRFd0VCL3dRQ01BQXdLd1lEVlIwakJDUXdJb0FnWjVVNm9EZTFpVEVsCnUwdXVFWENMSDhNZ2hJN2hranVuODZFT2J0TEZrMFV3Q2dZSUtvWkl6ajBFQXdJRFJ3QXdSQUlnZFFBd1Z2NTcKbWlodW51TkMzQzI0b3JkWGxrRVJHVFk4UTZnWStrVzRpSTBDSUQ2c3JmbUtxVzFPbkJveHhTZm5PS2NRc1FSUQpLWFFEKy8rQUpYdjB4Z0F6Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K"]}'

chaincodeInvoke '{"Args":["addRecord","record_2","liming","hospital_2","数据哭连接","name,sex,age","LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNRakNDQWVtZ0F3SUJBZ0lRSjI4blVmL2IwQUtUdzB1NWJUNDQ3REFLQmdncWhrak9QUVFEQWpCek1Rc3cKQ1FZRFZRUUdFd0pWVXpFVE1CRUdBMVVFQ0JNS1EyRnNhV1p2Y201cFlURVdNQlFHQTFVRUJ4TU5VMkZ1SUVaeQpZVzVqYVhOamJ6RVpNQmNHQTFVRUNoTVFiM0puTVM1bGVHRnRjR3hsTG1OdmJURWNNQm9HQTFVRUF4TVRZMkV1CmIzSm5NUzVsZUdGdGNHeGxMbU52YlRBZUZ3MHhOekE0TVRnd09ESTJNVGxhRncweU56QTRNVFl3T0RJMk1UbGEKTUhNeEN6QUpCZ05WQkFZVEFsVlRNUk13RVFZRFZRUUlFd3BEWVd4cFptOXlibWxoTVJZd0ZBWURWUVFIRXcxVApZVzRnUm5KaGJtTnBjMk52TVJrd0Z3WURWUVFLRXhCdmNtY3hMbVY0WVcxd2JHVXVZMjl0TVJ3d0dnWURWUVFECkV4TmpZUzV2Y21jeExtVjRZVzF3YkdVdVkyOXRNRmt3RXdZSEtvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUUKekRrVTJFOGt3RTVITVB5MHJ4VlJnYWFSeXJRWllsNE1mS2ZOd2NyR1BKUExqR3lWaUxZVHNpcXRJaE1wd2p1SgpxOFIvS2JmWEhHNktJdjFxTkhBOURLTmZNRjB3RGdZRFZSMFBBUUgvQkFRREFnR21NQThHQTFVZEpRUUlNQVlHCkJGVWRKUUF3RHdZRFZSMFRBUUgvQkFVd0F3RUIvekFwQmdOVkhRNEVJZ1FnWjVVNm9EZTFpVEVsdTB1dUVYQ0wKSDhNZ2hJN2hranVuODZFT2J0TEZrMFV3Q2dZSUtvWkl6ajBFQXdJRFJ3QXdSQUlnY2ZhTEJkc0dERGRNNE9WVQpUdG1wakZQT1BjWTFQZFdkWk1FMkdmbnFQUzRDSUJBTWNkZjRDNVgwSXhVemN4MVFVUEFuckYwY1RaZm05TjByCmtkWVRFV28zCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K"]}'

chaincodeQuery  '{"Args":["getSummary","liming"]}'

chaincodeQuery  '{"Args":["getSummary","hospital_1"]}'

chaincodeQuery  '{"Args":["getSummary","hospital_2"]}'

echo "此时liming的summary中recordList中应有2条记录,且ownerflag为true"
echo "此时hospital_1的summary中recordList中应有0条记录"
echo "此时hospital_2的summary中recordList中应有0条记录"

chaincodeQuery '{"Args":["havePermissionProvider","record_2","hospital_2","hospital_1"]}'

chaincodeQuery '{"Args":["havePermissionUser","record_2","hospital_1"]}'

chaincodeInvoke '{"Args":["addPermission","record_2","liming","hospital_1","permission_share","2017-12-12"]}'

chaincodeInvoke '{"Args":["addPermission","record_1","liming","hospital_2","permission_share","2017-12-12"]}'

chaincodeQuery  '{"Args":["getSummary","hospital_1"]}'

chaincodeQuery  '{"Args":["getSummary","hospital_2"]}'

echo "此时hospital_1的summary中recordList中应有1条记录,且ownerflag为false"
echo "此时hospital_2的summary中recordList中应有1条记录,且ownerflag为false"

chaincodeQuery '{"Args":["havePermissionProvider","record_2","hospital_2","hospital_1"]}'

chaincodeQuery '{"Args":["havePermissionUser","record_2","hospital_1"]}'

#使用josn字符串
#chaincodeInvoke peer chaincode invoke -o orderer.example.com:7050 -C mychannel -c '{"Args":["setShareItem","record_2","liming","{"name":{"Item":"name","Flag":true,"Ingegral":100},"sex":{"Item":"sex","Flag":true,"Ingegral":100},"age":{"Item":"age","Flag":false,"Ingegral":100}}"]}'

#'{"Args":["setShareItem","record_2","liming","{\"name\":{\"Item\":\"name\",\"Flag\":true,\"Ingegral\":100},\"sex\":{\"Item\":\"sex\",\"Flag\":true,\"Ingegral\":100},\"age\":{\"Item\":\"age\",\"Flag\":false,\"Ingegral\":100}}"]}'

#不使用json字符串
chaincodeInvoke '{"Args":["setShareItemString","record_2","liming","name,sex","100,200"]}'

chaincodeQuery '{"Args":["getRecord","record_2","liming"]}'

chaincodeQuery '{"Args":["getRecord","record_2","hospital_2"]}'

chaincodeQuery '{"Args":["getRecord","record_2","hospital_1"]}'

chaincodeQuery '{"Args":["havePermissionUser","record_2","research_1"]}'

chaincodeQuery  '{"Args":["getSummary","research_1"]}'

chaincodeInvoke '{"Args":["buyForRecord","record_2","research_1","2017-12-02"]}'

chaincodeQuery  '{"Args":["getSummary","research_1"]}'

chaincodeQuery  '{"Args":["getSummary","liming"]}'

chaincodeQuery '{"Args":["havePermissionProvider","record_2","hospital_2","research_1"]}'

chaincodeQuery '{"Args":["havePermissionUser","record_2","research_1"]}'

chaincodeInvoke '{"Args":["removePermission","record_1","liming","hospital_2"]}'

chaincodeQuery '{"Args":["havePermissionProvider","record_1","hospital_1","hospital_2"]}'

chaincodeQuery '{"Args":["havePermissionUser","record_1","hospital_2"]}'

chaincodeInvoke '{"Args":["updateAccessInfo","record_1","hospital_1","新的数据哭链接"]}'

chaincodeQuery '{"Args":["getRecord","record_1","hospital_1"]}'

