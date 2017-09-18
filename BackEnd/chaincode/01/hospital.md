## 医疗信息授权共享设计

##  1.数据结构
#### (A) PatientRecord

    (recordId, ownerId, accessInfo, permissionList)
        recordId:数据记录唯一标识
        ownerId:数据所有者id
        accessInfo:数据访问的相关信息（根据医院需求扩充）
        permissisonList:权限列表
            [userId]
            userId:拥有该条记录权限的用户id

#### (B) UserSummary
    (userId, count, recordList)
        userId:用户id
        count:用户拥有数据数目条数
        recordIdList:用户拥有的数据记录id列表
            [recordId]
            recordId:数据记录唯一标识

##  2.数据管理流程
    数据所有者（ownerId）对其拥有的数据具有最高权限，可以设定permissionList控制访问

####    数据查询流程

1.数据查询（例如A（可为第三方）想要查询B医院某条数据）
    1.A向B发出请求(区块链外完成)
    2.B根据A请求数据，从区块链查询A是否有相应权限
    3.区块链返回权限结果
    4.A根据结果决定是否发送数据给B(区块链外查询)

2.添加数据记录
    1.更新记录到区块链
    2.在owner的UserSummary的recordList中添加recordId，count+1;

3.更新权限
    1.记录owner对数据权限进行更新，在permissionList添加用户id
    2.将recordId更新至userSummary中

####    chaincode数据接口

//新用户注册
1.register(userId)
    新用户在区块链中注册
    1.检查用户是否合法
    2.设置初始默认值，count=0；recordList=[]
    3.更新数据入区块链

//用户添加记录
2.addRecord(recordId, ownerId, accessInfo)
    添加记录
    1.检查数据是否合法
    2.更新record
    3.更新用户UserSummary

//数据所有者添加权限
3.addPermission(recordId, ownerId, permissionId)
    数据所有者为记录添加权限
    1.检查数据合法性
    2.检查permissionIdList是否已有数据存在
    3.向permissionList追加不重复id
    4.更新追加的id中对应的UserSummary

//数据所有者移除部分用户权限
4.removePermission(recordId, ownerId, permissionId)
    数据所有者为记录删除权限
    1.检查数据合法性
    2.从permissionList删除相应id
    3.更新已删除id的UserSummary

//数据所有者更新数据访问信息
5.updateAccessInfo(recordId, ownerId, accessInfo)
    数据所有者更新accessInfo
    1.检查数据合法性
    2.更新accessInfo

//数据所有者查询记录
6.getRecord(recordId, ownerId)
    1.检查数据合法性
    2.获取record

//用户查询自己summary
7.getSummary(userId)
    1.检查数据合法性
    2.获取summary

//B（数据拥有者）判断A（数据请求者）是否拥有该条数据权限
8.havePermissionOwner(recordId, ownerId, userId)
    1.检查数据合法性
    2.判断user是否有权限
    3.返回结果

//A（数据请求者）判断自己是否用某条记录的权限
9.havePermissionUser(userId, recordId)
    1.检查数据合法性
    2.判断user是否拥有recordId的权限
    3.返回判断结果




