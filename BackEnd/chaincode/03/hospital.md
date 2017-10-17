## 医疗信息授权共享设计

##  1.数据结构
#### (A) PatientRecord

    (recordId, ownerId, providerId, accessInfo, patientInfo, permissionList, shareFlag)
        recordId:数据记录唯一标识
        ownerId:数据所有者id
        providerId:数据提供者id,如贾某A在医院B体检,则该体检报告所有者为A,提供者为B,B在生成A的记录时,需同时将数据加入
        在区块链上..
        accessInfo:数据访问的相关信息（根据医院需求扩充,数据提供者可以修改）
        datahash:数据记录hash,用于验证数据真伪
        patientInfo:数据记录的信息
            map[item]{item, flag, ingegral}
            item:数据字段
            flag:是否共享标志
            ingegral:该字段共享所需积分,所有字段所需积分相加为总的积分
        ingegral:购买该条共享记录所需积分
        permissisonList:权限列表
            [userId, permissionType, deadline, ownerflag]
            userId:拥有该条记录权限的用户id(一般为医院和研究机构)
            permissiontype:该用户拥有权限的类型,分为查看共享信息权限和查看全部信息权限.
            deadline:权限截止日期(形如:"2016-01-02")
            ownerflag:暂未使用
        shareFlag:表明该条记录是否允许进行共享


#### (B) UserSummary
    (userId, count, recordList)
        userId:用户id(唯一标识)
        userName:用户名称
        userInfo:用户基本信息
        userType:用户类别(个人,医院,研究机构等)
        count:用户拥有数据数目条数
        ingegral:用户积分
        recordIdList:用户拥有的共享的数据记录id列表
            [recordId, permissiontype, deadline, ownerflag]
            recordId:数据记录唯一标识
            permissiontype:拥有数据记录权限类型
            deadline:权限截止时间
            ownerflag:是否为自己所拥有的数据

##  2.数据管理流程
    数据所有者（ownerId）对其拥有的数据具有最高权限，可以将数据共享给他人,设定相应的权限列表
    数据提供者(providerId)对提供的数据拥有查询的权限(所有的信息),需将病人的记录添加到区块链上.
    购买了该条记录的用户可对数据的共享部分进行访问.当医院C(不是记录提供者想要查看该条记录时,可以向用户发出请求,链外)

####    数据查询流程

    1.数据查询(A想要查询B的某条数据)
        1.A向B发送一条数据查询请求.(链外)
        2.B在区块链上查看A是否拥有该条数据的权限或拥有权限类型
        3.区块链返回权限结果
        4.A根据结果决定是否发送数据给B(区块链外)

    2.权限申请
        1.研究机构可以向用户提出购买申请(购买操作系统自动完成).
        2.购买完成后,可以查看用户的共享数据.

    3.查看申请
        1.当医院C不是病人A的数据提供者(医院B)时,可以向A发出查看数据申请.(链外)
        2.病人同意后,默认授予该医院1天的访问时间(传入参数).(链外)
        3.更新医院权限(链内)
        4.医院C随后向医院B发出查询请求,医院B根据1步骤完成查询.(链外)

    2.添加数据记录
        1.医院添加数据时,同时将相关索引信息更新到区块链上

    3.更新权限
        1.记录owner对数据权限进行更新，在permissionList添加用户id,权限类型
        2.将recordId更新至userSummary中

####    chaincode数据接口

    //新用户注册
    1.register(userId, userName, userInfo, userType)
        userid:用户id
        username:用户名称
        userinfo:用户基本信息
        usertype:用户类型
        新用户在区块链中注册
        1.检查用户是否已存在
        2.系统设置初始默认值，count=0；recordList=[],ingegral=1000
        3.更新数据入区块链

    //用户添加记录
    2.addRecord(recordId, ownerId, providerId, accessInfo, patientInfo, datahash)
        添加记录:医院A添加病人B的记录,A的usersummary中的record列表中不会有该条记录(因为医院本地会有该条数据),但病人的usersummary中会有(病人
        没有存储数据,需通过链上信息去查询自己的记录). record中的权限列表中不含owner的信息.
        patientInfo:例如:"data,sex,name"
        recordid:记录id
        ownerid:拥有者id
        providerid:提供方id
        accessinfo:数据访问方式信息
        patientinfo:病人信息字段.
        datahash:数据记录hash
        1.检查数据是否合法
        2.检查数据provider,owner是否已存在(未存在需注册),(owner是否需存在需讨论).
        3.设置默认值,ingegral=0,permissionList=[],shareFlag=false,patientInfo中item的flag设置为false,integral=0.
        2.更新record
        3.更新用户UserSummary


    //数据所有者添加权限
    3.addPermission(recordId, ownerId, userId, permissionType, deadline)
        recordId:记录id
        ownerId:拥有者id
        userId:用户id
        permissionType:权限类型(可为permission_all,permission_share)
        deadline:权限截止时间
        1.检查记录是否已存在,用户owner是否一致, user需注册.
        2.检查本地permissionList是否已有相应数据数据存在
        3.检查权限列表中是否以存在userid
        4.添加权限(record)
        4.更新追加的id中对应的UserSummary(用户摘要)

    //数据所有者移除部分用户权限
    4.removePermission(recordId, ownerId, userId)
        recordId:记录id
        ownerid:拥有者id
        userid:用户id
        数据所有者为记录删除权限
        1.检查数据合法性,检查权限是否存在
        2.从permissionList删除相应权限内容
        3.更新已删除id的UserSummary

    //数据提供者更新数据访问信息
    5.updateAccessInfo(recordId, providerId, accessInfo)
        recordId:记录id
        providerid:数据提供方id
        accessinfo:数据访问信息
        数据所有者更新accessInfo
        1.检查数据合法性
        2.更新accessInfo

    //数据所有者查询记录
    6.getRecord(recordId, userId)
        recordId:数据记录id
        userid:用户id
        根据user权限返回相应record内容,provider,owner,和权限为permission_all会返回所有数据,permission_share会去除未共享数据.
        1.检查数据合法性
        2.获取record

    //用户查询自己summary
    7.getSummary(userId)
        userid:用户id
        1.检查数据合法性
        2.获取summary

    //B（数据提供者）判断A（数据查询请求者）是否拥有该条数据权限
    8.havePermissionProvider(recordId, providerId, userId)
        recordid:记录id
        providerid:数据提供者id
        userid:申请查询数据用户id
        数据提供方查询用户A是否具有该record的权限.仅返回是否有权限,不返回拥有的权限类型.
        如果用户A为record的拥有者,返回拥有权限.
        1.检查数据合法性
        2.判断user是否含有相应权限
        3.返回结果

    //A（数据请求者）判断自己是否拥有某条记录的权限
    9.havePermissionUser(recordId, userId)
        recordid:记录id
        userid:用户id
        用户判断自己是否拥有某条记录的权限,该部分内容只会查询用户的UserSummary.
        1.检查数据合法性
        2.判断user是否拥有recordId的权限
        3.返回判断结果

    10.buyForRecord(recordId, userId, deadline)
        recordid:记录id
        userid:用户id
        deadline:权限截止时间
        用户购买某条数据
        1.检查基本的信息.
        2.检查该条记录是否被共享,检查用户钱购买后>0
        3.用户钱减少相应的数目,ownerid增加相应数据.
        4.添加权限.

    11.setShareItem(recordid,ownerid,patientdata)
        recordId:记录id
        userId:用户id
        patientInfo:所有字段的信息(为json格式字符串,字段数据应与原系统存储的数据相同,为map[string]{item(string),flag(bool),ingegral(int)})
        1.检查基本信息,将patientdata利用json转为object.
        2.覆盖原来的patientinfo,设置shareflag为true,设置该条数据的价格.

    12.setShareString(recordId,ownerId,dataItem,itemIngegral)
        recordId:记录id
        userId:用户id
        dataItem:需要共享的字段,例如:"name,sex"
        itemIngegral:查看共享字段对应的积分,例如:"100,200"
        1.检查基本信息
        2.设置