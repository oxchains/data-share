/*
Copyright IBM Corp 2016 All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package main

import (
	"fmt"
	"encoding/json"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
	"time"
	"strings"
)


// hosptialChaincode example simple Chaincode implementation
type hospitalChaincode struct {
}

//the first letter of the item of the struct must be upper, or json.Marshal will return []byte
//the record of every patient
type PatientRecord struct {
	RecordId string           `json:recordId`
	OwnerId string            `json:ownerId`
	ProviderId string         `json:providerId`
	AccessInfo string         `json:accessInfo`
	Datahash string           `json:datahash`
	PatientInfo []PatientData `json:patientInfo`
	Ingegral int              `json:ingegral`
	PermissionList []permission `json:permissionList`
	ShareFlag bool              `json:shareFlag`
}

type PatientData struct {
	Item string    `json:item`
	Flag bool      `json:flag`
	Ingegral int   `json:ingegral`
}

//the summary of different user(record:ownerId, provierId)
type UserSummary struct {
	UserId string     `json:userId`
	UserName string   `json:userName`
	UserInfo string   `json:userInfo`
	UserType string   `json:userType`
	Count int         `json:count`
	Ingegral int      `json:ingegral`
	RecordList []permission  `json:recordList`
}

type permission struct {
    Id string               `json:id`
	PermissionType string   `json:permissionType`
	Deadline time.Time      `json:deadline`
	OwnerFlag bool          `json:ownerFlag`
}
// ======================================================================©======================================================
// Main
// ============================================================================================================================
const (
	USER_HOSPITAL = "user_hospital"
	USER_PERSON = "user_person"
	USER_RESEARCH = "user_research"

	QUERY_PERMISSION_ALL = "permission_all"
	QUERY_PERMISSION_SHARE = "permission_share"

	DATAITEM_SEP = ","

	DEFAULT_SHARE_FLAG = false

	DEADLINE_FORMAT = "2006-01-02"
)

const (
    DEFAULT_COUNT = 0
	DEFAULT_INGEGRAL = 10000
)


func main() {
	err := shim.Start(new(hospitalChaincode))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}

func (t *hospitalChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	return shim.Success(nil)
}

// Invoke is our entry point to invoke a chaincode function
func (t *hospitalChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	function, args := stub.GetFunctionAndParameters()
	switch function {

	case "register":
		return t.register(stub, args)

	case "addRecord":
		return t.addRecord(stub, args)

	case "addPermission":
		return t.addPermission(stub, args)

	case "removePermission":
		return t.removePermission(stub, args)

	case "updateAccessInfo":
		return t.updateAccessInfo(stub, args)

	case "getRecord":
		return t.getRecord(stub, args)

	case "getSummary":
		return t.getSummary(stub, args)

	case "havePermissionProvider":
		return t.havePermissionProvider(stub, args)

	case "havePermissionUser":
		return t.havePermissionUser(stub, args)

	case "buyForRecord":
		return t.buyForRecord(stub, args)

	case "setShareItem":
		return t.setShareItem(stub, args)

	default:
		return shim.Error("UnSupported Operation")
	}
}

//register the user
//to use the chaincode function.you have to register a user first
func (t *hospitalChaincode) register(stub shim.ChaincodeStubInterface, args []string) pb.Response {
    if len(args) != 4 {
		shim.Error("register operation must include four argument(userId, userName, userInfo, userType)")
	}

	userId := args[0]
	userName := args[1]
	userInfo := args[2]
	userType := args[3]
	count := DEFAULT_COUNT
	ingegral := DEFAULT_INGEGRAL
	recordIdList := []permission{}
	//check the existence of user
	existed, err := checkStateExist(stub, userId)
	if err != nil {
		return shim.Error("register operation failed :" + err.Error())
	}
	if existed == true {
		return shim.Error("register operation failed : user already existed" )
	}

    //update the userSummary
	var userSummary UserSummary
	userSummary = UserSummary{
		UserId : userId,
		UserName : userName,
		UserInfo : userInfo,
		UserType : userType,
        Count : count,
		Ingegral : ingegral,
		RecordList : recordIdList,
	}
	err = putState(stub, userId, userSummary)
	if err != nil {
		return shim.Error("register operation failed : " + err.Error())
	}

	return shim.Success(nil)
}

//add the record of patient
func (t *hospitalChaincode) addRecord(stub shim.ChaincodeStubInterface, args []string) pb.Response  {
	if len(args) < 6 {
		shim.Error("addRecord operation must at least include three arguments(recordId, ownerId, accessInfo, dataitemstring, datahash)")
	}
	recordId := args[0]
	ownerId := args[1]
	providerId := args[2]
	accessInfo := args[3]
	dataItemString := args[4]
	datahash := args[5]

	ingegral := 0
	permissionList := []permission{}
	dataItem := getDataItem(dataItemString)
	patientInfo := setDefaultPatientInfo(dataItem)
	shareFlag := DEFAULT_SHARE_FLAG

	//check the existence of record
	existed, err := checkStateExist(stub, recordId)
	if err != nil {
        return shim.Error("addRecord operation failed : " + err.Error())
	}
	if existed == true {
		return shim.Error("addRecord operation failed : record already existed")
	}
    //check the existence of the provider
	existed, err = checkStateExist(stub, providerId)
	if err != nil {
		return shim.Error("addRecord operation failed : " + err.Error())
	}
	if existed == false {
		return shim.Error("addRecord operation failed : providerId not existed, please register the provider first ")
	}
	//check the existence of the owner
	existed, err = checkStateExist(stub, ownerId)
	if err != nil {
		return shim.Error("addRecord operation failed : " + err.Error())
	}
	if existed == false {
		return shim.Error("addRecord operation failed : ownerId not existed, please register the ownerId first")
	}

	//add the patientRecord
	var record PatientRecord
	record = PatientRecord{
		RecordId : recordId,
		OwnerId : ownerId,
		ProviderId : providerId,
		AccessInfo : accessInfo,
		PatientInfo : patientInfo,
		Datahash : datahash,
		Ingegral : ingegral,
		PermissionList : permissionList,
		ShareFlag : shareFlag,
	}
	err = putState(stub, recordId, record)
	if err != nil {
		return shim.Error("addRecord Operation failed : " + err.Error())
	}

	//update the owner's summary
	var userSummary UserSummary
	err = getState(stub, ownerId, &userSummary)
	if err != nil {
		return shim.Error("addRecord Operation failed : " + err.Error())
	}
	recordData := permission{
		Id : recordId,
		PermissionType : QUERY_PERMISSION_ALL,
        Deadline : time.Now().Add(time.Hour*24*365*100),
        OwnerFlag : true,
	}
	userSummary.RecordList = append(userSummary.RecordList, recordData)
	userSummary.Count++
    err = putState(stub, ownerId, userSummary)
	if err != nil {
		return shim.Error("addRecord Operation failed : " + err.Error())
	}

	return shim.Success(nil)
}

//add the permission of the record for a user by record's owner
func (t *hospitalChaincode) addPermission(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 5 {
		return shim.Error("addPermission Operation must include five arguments(recordId, ownerId, userId, permissionType, deadline) ")
	}
	recordId := args[0]
	ownerId := args[1]
	userId := args[2]
	permissionType := args[3]
	deadline := args[4]

	//get the record
	var patientRecord PatientRecord
	err := getState(stub, recordId, &patientRecord)
	if err != nil {
		return shim.Error("addPermission Operation failed : " + err.Error())
	}

	//check the owner and user
	if patientRecord.OwnerId != ownerId {
		return shim.Error("addPermission Operation failed. the owner doesn't have the right")
	}
	var userSummary UserSummary
	err = getState(stub, userId, &userSummary)
	if err != nil {
		return shim.Error("addPermission Operation failed : " + err.Error())
	}

	//check args
    deadDate, err := timeFormat(deadline)
	if err != nil {
		return shim.Error("addPermission Operation failed : " + err.Error())
	}

	//add the permissionId into record
	//check the util of permissionId
	container := contain(userId, patientRecord.PermissionList)
	if container == true {
		return shim.Error("the permissionId is already in the permissionList")
	}
	permissionData := permission{
		Id : userId,
		PermissionType : permissionType,
		Deadline : deadDate,
		OwnerFlag : false,
	}
	patientRecord.PermissionList = append(patientRecord.PermissionList, permissionData)

	err = putState(stub, recordId, patientRecord)
    if err != nil {
		return shim.Error("addPermission Operation failed : " + err.Error())
	}

	//update the user's summary
	permissionDataUser := permission{
		Id : recordId,
		PermissionType : permissionType,
		Deadline : deadDate,
		OwnerFlag : false,
	}
	userSummary.RecordList = append(userSummary.RecordList, permissionDataUser)
	userSummary.Count++
    err = putState(stub, userId, userSummary)
	if err != nil {
        return shim.Error("addPermission Operation failed : " + err.Error())
	}

	return shim.Success(nil)
}

func (t *hospitalChaincode) removePermission(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 3 {
		return shim.Error("removePermission Operation must include three arguments(recordId, ownerId, userId)")
	}
	recordId := args[0]
	ownerId := args[1]
	userId := args[2]

	//get the record
	var patientRecord PatientRecord
	err := getState(stub, recordId, &patientRecord)
	if err != nil {
		return shim.Error("removePermission Operation failed. Error while json.unmarshal(record) " + err.Error())
	}
	//check the owner
	if patientRecord.OwnerId != ownerId {
		return shim.Error("removePermission Operation failed. owner is not equal. don't have the right")

	}
	//remove the userId from record
	container := contain(userId, patientRecord.PermissionList)
	if container == false {
		return shim.Success([]byte("the permissionId don't have the permission already"))
	}
	patientRecord.PermissionList = deleteValue(userId, patientRecord.PermissionList)
	err = putState(stub, recordId, patientRecord)
	if err != nil {
		return shim.Error("removePermission Operation failed. Error while putstate(newRecord) " + err.Error())
	}
	//update the userSummary
	var userSummary UserSummary
	err = getState(stub, userId, &userSummary)
	if err != nil {
		return shim.Error("removePermission Operation failed. Error while json.unmarshal(userSummary) " + err.Error())
	}
	userSummary.RecordList = deleteValue(recordId, userSummary.RecordList)
	userSummary.Count--
    err = putState(stub, userId, userSummary)
	if err != nil {
		return shim.Error("removePermission Operation failed. Error while putstate(newUserSummary) " + err.Error())
	}

	return shim.Success(nil)
}

func (t *hospitalChaincode) updateAccessInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 3 {
		return shim.Error("updateAccessInfo Operation must include three arguments(recordId, ownerId, accessInfo)")
	}
	recordId := args[0]
	providerId := args[1]
	accessInfo := args[2]

	//get the record
	var patientRecord PatientRecord
	err := getState(stub, recordId, &patientRecord)
	if err != nil {
		return shim.Error("updateAcessInfo Operation failed : " + err.Error())
	}
	//check the provider
	if patientRecord.ProviderId != providerId {
		return shim.Error("updateAccessInfo Operation failed. provider is not equal,do not have the right. please give the right providerId ")
	}
	//update the accessInfo of the patientRecord
	patientRecord.AccessInfo = accessInfo
	err = putState(stub, recordId, patientRecord)
	if err != nil {
		return shim.Error("updateAccessInfo Operation failed : " + err.Error())
	}

	return shim.Success(nil)

}

func (t *hospitalChaincode) getRecord(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 2 {
		return shim.Error("getRecord Operation must include two arguments(recordId, userId)")
	}

	recordId := args[0]
	userId := args[1]
	//get the record
	var patientRecord PatientRecord
	err := getState(stub, recordId, &patientRecord)
	if err != nil {
		return shim.Error("getRecord Operation failed : " + err.Error())
	}
	record, err := json.Marshal(patientRecord)
	if err != nil {
		return shim.Error("getRecord Operation failed : " + err.Error())
	}
	//if the user is owner or provider, then return allinfo
	if userId == patientRecord.ProviderId || userId == patientRecord.OwnerId {
        return shim.Success(record)
	}
	permissionType, err := getPermissionType(userId, patientRecord.PermissionList)
	if err != nil {
		return shim.Error("getRecord Operation failed : " + err.Error())
	}
	permissionRecord, err := getPermissionRecord(permissionType, patientRecord)
	newRecord, err := json.Marshal(permissionRecord)
	if err != nil {
		return shim.Error("getRecord Operation failed : " + err.Error())
	}

	return shim.Success(newRecord)
}

//
func (t *hospitalChaincode) getSummary(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 1 {
		return shim.Error("getSummary Operation must include one argument(userId)")
	}
	userId := args[0]

	value, err := stub.GetState(userId)
	if err != nil {
		return shim.Error("getSummary Operation failed. Error while getSummary " + err.Error())
	}
	if value == nil {
		return shim.Error("getSummary Operation failed. don't have the user")
	}
	return shim.Success(value)
}

func (t *hospitalChaincode) havePermissionProvider(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 3 {
		return shim.Error("havePermissionOwner Operation must include three arguments(recordId, providerId, userId)")
	}
	recordId := args[0]
	providerId := args[1]
	userId := args[2]

	//check the owner
	var patientRecord PatientRecord
	err := getState(stub, recordId, &patientRecord)
	if err != nil {
		return shim.Error("havePermissionOwner Operation failed : " + err.Error())
	}
	if patientRecord.ProviderId != providerId {
		return shim.Error("havePermissionOwner Operation failed. ProviderId is not equal,don't have the right. please give the right providerId ")
	}
	//check the permission(include the type "all" and "share")
	if userId == patientRecord.OwnerId {
		return shim.Success([]byte("true"))
	}
	mission := checkPermission(userId, patientRecord.PermissionList)
	if mission == true {
		return shim.Success([]byte("true"))
	}
	return shim.Success([]byte("false"))

}

func (t *hospitalChaincode) havePermissionUser(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 2 {
		return shim.Error("havePermissionUser Operation must include two arguments(recordId, userId)")
	}

	recordId := args[0]
	userId := args[1]
	var userSummary UserSummary
	err := getState(stub, userId, &userSummary)
	if err != nil {
		return shim.Error("havePermissionUser Operation failed : " + err.Error())
	}
	mission := checkPermission(recordId, userSummary.RecordList)
	if mission == true {
		return shim.Success([]byte("true"))
	}
	return shim.Success([]byte("false"))
}

func (t *hospitalChaincode) buyForRecord(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 3 {
		return shim.Error("buyForRecord at least include three arguments(recordId, userId, deadline)")
	}
	recordId := args[0]
	userId := args[1]
	deadline := args[2]

	//check the user,owner
	var record PatientRecord
	err := getState(stub, recordId, &record)
	if err != nil {
		return shim.Error("buyForRecord failed : " + err.Error())
	}
	var userSummary UserSummary
	err = getState(stub, userId, &userSummary)
	if err != nil {
		return shim.Error("buyForRecord failed : " + err.Error())
	}
	var ownerSummary UserSummary
	err = getState(stub, record.OwnerId, &ownerSummary)
	if err != nil {
		return shim.Error("buyForRecord failed : " + err.Error())
	}

	//check ingegral,shareFlag
	if record.ShareFlag == false {
		return shim.Error("this record haven't been shared,please change the recordId")
	}
	userSummary.Ingegral = userSummary.Ingegral - record.Ingegral
	if userSummary.Ingegral < 0 {
		return shim.Error("buyForRecord failed : user's ingegral is not enough")
	}
    ownerSummary.Ingegral = ownerSummary.Ingegral + record.Ingegral

	//check args
	deadDate, err := timeFormat(deadline)
	if err != nil {
		return shim.Error("buyForRecord Operation failed : " + err.Error())
	}

	//add the permissionId into record
	//check the util of permissionId
	container := contain(userId, record.PermissionList)
	if container == true {
		return shim.Error("you already have the permission")
	}
	permissionData := permission{
		Id : userId,
		PermissionType : QUERY_PERMISSION_SHARE,
		Deadline : deadDate,
		OwnerFlag : false,
	}
	record.PermissionList = append(record.PermissionList, permissionData)


	if err != nil {
		return shim.Error("addPermission Operation failed : " + err.Error())
	}

	//update the user's summary
	permissionDataUser := permission{
		Id : recordId,
		PermissionType : QUERY_PERMISSION_SHARE,
		Deadline : deadDate,
		OwnerFlag : false,
	}
	userSummary.RecordList = append(userSummary.RecordList, permissionDataUser)
	userSummary.Count++
	err = putState(stub, recordId, record)
	if err != nil {
		return shim.Error("addPermission Operation failed : " + err.Error())
	}
	err = putState(stub, userId, userSummary)
	if err != nil {
		return shim.Error("addPermission Operation failed : " + err.Error())
	}
	err = putState(stub, record.OwnerId, ownerSummary)
	if err != nil {
		return shim.Error("addPermission Operation failed : " + err.Error())
	}

	return shim.Success(nil)
}

func (t *hospitalChaincode) setShareItem(stub shim.ChaincodeStubInterface, args []string) pb.Response {
    if len(args) < 3 {
		return shim.Error("setShareItem at least include three arguments(recordId, ownerId, patientDataString(json))")
	}
	recordId := args[0]
	ownerId := args[1]
	patientDataString := args[2]

	var record PatientRecord
	err := getState(stub, recordId, &record)
	if err != nil {
		return shim.Error("setShareItem failed : " + err.Error())
	}
	if ownerId != record.OwnerId {
		return shim.Error("setShareItem failed : ownerId is not equal")
	}

	var patientInfo []PatientData
	err = json.Unmarshal([]byte(patientDataString), &patientInfo)
	if err != nil {
		return shim.Error("setShareItem failed : " + err.Error())
	}
    if len(patientInfo) != len(record.PatientInfo) {
		return shim.Error("the patientInfo dataitem length is not right")
	}

	record.PatientInfo = patientInfo
	record.Ingegral = addIngegral(patientInfo)
	record.ShareFlag = true
	err = putState(stub, recordId, record)
	if err != nil {
		return shim.Error("setShareItem failed : " + err.Error())
	}

	return shim.Success(nil)
}

func getDataItem(dataItemString string) []string {
	return strings.Split(dataItemString, DATAITEM_SEP)
}

func setDefaultPatientInfo(dataItem []string) []PatientData{
	var patientInfo []PatientData
	for _, item := range dataItem {
		patientData := PatientData{}
		patientData.Item = item
		patientData.Flag = DEFAULT_SHARE_FLAG
		patientData.Ingegral = 0
		patientInfo = append(patientInfo, patientData)
	}

	return patientInfo
}

//update the state
func putState(stub shim.ChaincodeStubInterface, stateId string, state interface{}) error {
	stateString, err := json.Marshal(state)
	if err != nil {
		return err
	}
	err = stub.PutState(stateId, stateString)
	if err != nil {
	    return err
	}

	return nil
}

func getState(stub shim.ChaincodeStubInterface, stateId string, state interface{}) error {
    stateString, err := stub.GetState(stateId)
	if err != nil {
		return err
	}
	if stateString == nil {
		return fmt.Errorf("state not existed")
	}
	err = json.Unmarshal(stateString, state)
	if err != nil {
		return err
	}

	return nil
}

func getPermissionRecord(permissionType string, record PatientRecord) (PatientRecord, error) {
	if permissionType == QUERY_PERMISSION_ALL {
        return record, nil
	} else if permissionType == QUERY_PERMISSION_SHARE {
        var patientData []PatientData
		for _, v := range record.PatientInfo {
			if v.Flag == true {
				patientData = append(patientData, v)
			}
		}
        record.PatientInfo = patientData
		return record, nil
	} else {
		return PatientRecord{}, fmt.Errorf("don't have the right permissiontype")
	}
}

//format the timestring
func timeFormat(dateString string) (time.Time, error) {
	date, err := time.Parse(DEADLINE_FORMAT, dateString)
	if err != nil {
		return time.Now(), err
	}
	return date, nil
}
//true means state existed;false means not existed
func checkStateExist(stub shim.ChaincodeStubInterface, stateId string) (bool, error) {
	value, err := stub.GetState(stateId)
	if err != nil {
		return false, err
	}
	if value != nil {
		return true, nil
	}
	return false, nil
}

func checkPermission(id string, permissionList []permission) bool {
	for _, v := range permissionList {
		if v.Id == id {
			if v.OwnerFlag == true {
				return true
			}
			now := time.Now()
			if v.Deadline.After(now) {
                return true
			}
		}
	}
    return false
}

func addIngegral(patientInfo []PatientData) int {
	ingegral := 0
	for _, v := range patientInfo {
		if v.Flag == true {
			ingegral += v.Ingegral
		}
	}
	return ingegral
}

//check list is contain the value or not
func contain(value string, list []permission) bool {
	for _, v := range list {
		if value == v.Id {
			return true
		}
	}
	return false
}

//
func getPermissionType(userId string, permissionList []permission) (string, error) {
	for _, v := range permissionList {
		if userId == v.Id {
			return v.PermissionType, nil
		}
	}
	return "", fmt.Errorf("don't have the permission of the record")
}

//delete the value in the list
func deleteValue(value string, list []permission) []permission {
	index := -1
	for i, v := range list {
        if value == v.Id {
			index = i
			break
		}
	}
    if index < 0 {
        return list
    } else if index + 1 >= len(list) {
		return list[0:index]
	} else {
        return append(list[0:index], list[index+1:]...)
	}
}
