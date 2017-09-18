#测试运行文档
#dev环境配置：使用fabric-sample中的chiancode-docker-dev作为测试环境
#1. docker exec -it chaincode bash
#运行chaincode（chaincode节点）：CORE_PEER_ADDRESS=peer:7051 CORE_CHAINCODE_ID_NAME=mycc:0 ./hospitalchaincode
#2. docker exec -it cli bash
#chaincode安装
peer chaincode install -p chaincodedev/chaincode/hospitalchaincode -n mycc -v 0 >> log.txt &&

#chaincode初始化
peer chaincode instantiate -n mycc -v 0 -c '{"Args":[]}' -C myc >> log.txt >> log.txt

#注册医院hospital_1, hospital_2, hospital_3
peer chaincode invoke -n mycc -c '{"Args":["register", "hospital_1"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["register", "hospital_2"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["register", "hospital_3"]}' -C myc >> log.txt

#添加记录
#为hospital_1添加记录
peer chaincode invoke -n mycc -c '{"Args":["addRecord","record_1","hospital_1","sex_name_access_1"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addRecord","record_2","hospital_1","sex_name_access_2"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addRecord","record_3","hospital_1","sex_name_access_3"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addRecord","record_4","hospital_1","sex_name_access_4"]}' -C myc >> log.txt
#为hospital_2添加记录
peer chaincode invoke -n mycc -c '{"Args":["addRecord","record_5","hospital_2","sex_name_access_5"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addRecord","record_6","hospital_2","sex_name_access_6"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addRecord","record_7","hospital_2","sex_name_access_7"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addRecord","record_8","hospital_2","sex_name_access_8"]}' -C myc >> log.txt
#为hospital_3添加记录
peer chaincode invoke -n mycc -c '{"Args":["addRecord","record_9","hospital_3","sex_name_access_9"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addRecord","record_10","hospital_3","sex_name_access_10"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addRecord","record_11","hospital_3","sex_name_access_11"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addRecord","record_12","hospital_3","sex_name_access_12"]}' -C myc >> log.txt

#添加权限
peer chaincode invoke -n mycc -c '{"Args":["addPermission","record_1","hospital_1","hospital_2"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addPermission","record_5","hospital_2","hospital_1"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addPermission","record_12","hospital_3","hospital_2"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addPermission","record_1","hospital_1","hospital_3"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addPermission","record_1","hospital_1","hospital_3"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["addPermission","record_5","hospital_1","hospital_1"]}' -C myc >> log.txt

#移除权限
peer chaincode invoke -n mycc -c '{"Args":["removePermission","record_1","hospital_1","hospital_2"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["removePermission","record_5","hospital_2","hospital_1"]}' -C myc >> log.txt
peer chaincode invoke -n mycc -c '{"Args":["removePermission","record_12","hospital_3","hospital_2"]}' -C myc >> log.txt

#更新访问信息
peer chaincode invoke -n mycc -c '{"Args":["updateAccessInfo","record_12","hospital_3","sex_name_access_change_12"]}' -C myc >> log.txt

#获取记录信息
peer chaincode invoke -n mycc -c '{"Args":["getRecord","record_5","hospital_1"]}' -C myc >> log.txt

#获取summary信息
peer chaincode query -n mycc -c '{"Args":["getSummary","hospital_1"]}' -C myc >> log.txt

#判断是否拥有权限（owner判断)
peer chaincode query -n mycc -c '{"Args":["havePermissionOwner","record_1","hospital_1","hospital_2"]}' -C myc >> log.txt

#判断是否拥有权限（user判断）
peer chaincode query -n mycc -c '{"Args":["havePermissionUser","hospital_3","record_1"]}' -C myc >> log.txt
