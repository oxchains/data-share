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

package _1

import (
	"fmt"
	"encoding/json"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)


// hosptialChaincode example simple Chaincode implementation
type hospitalChaincode struct {
}

//the first letter of the item of the struct must be upper, or json.Marshal will return []byte
//the record of every patient
type PatientRecord struct {
	RecordId string
	OwnerId string
	AccessInfo string
	PermissionIdList []string
}

//the summary of different user(record:ownerId, provierId)
type UserSummary struct {
	UserId string
	Count int
	RecordList []string
}

// ======================================================================©======================================================
// Main
// ============================================================================================================================
func main() {
	err := shim.Start(new(hospitalChaincode))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}

// Init resets all the things
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

	case "havePermissionOwner":
		return t.havePermissionOwner(stub, args)

	case "havePermissionUser":
		return t.havePermissionUser(stub, args)

	default:
		return shim.Error("UnSupported Operation")
	}
}

//register the user
//to user the chaincode function.you have to register a user first
func (t *hospitalChaincode) register(stub shim.ChaincodeStubInterface, args []string) pb.Response {
    if len(args) != 1 {
		shim.Error("register operation must include one argument(userId)")
	}

    //check the existence of user
	userId := args[0]
	value, err := stub.GetState(userId)
	if err != nil {
		return shim.Error("register operation failed. Error while get userSummary " + err.Error())
	}
	if value != nil {
		return shim.Error("register operation failed. userId Existed")
	}

    //update the userSummary
	var userSummary UserSummary
	userSummary = UserSummary{userId, 0, []string{}}
	newValue, err := json.Marshal(userSummary)
	if err != nil {
		return shim.Error("register operation failed. Error while json.marshal(UserSummary) " + err.Error())
	}
	err = stub.PutState(userId, newValue)
	if err != nil {
		return shim.Error("register operation failed. Error while putState " + err.Error())
	}
	return shim.Success(nil)
}

//add the record of patient
func (t *hospitalChaincode) addRecord(stub shim.ChaincodeStubInterface, args []string) pb.Response  {
	if len(args) < 3 {
		shim.Error("addRecord operation must at least include three arguments(recordId, ownerId, accessInfo)")
	}
	recordId := args[0]
	ownerId := args[1]
	accessInfo := args[2]

	//check the existence of record
	value, err := stub.GetState(recordId)
	if err != nil {
		return shim.Error("addRecord operation failed. Error while getRecord " + err.Error())
	}
	if value != nil {
		return shim.Error("addRecord operation failed. recordId existed")
	}
    //check the existence of the owner
	userSummaryValue, err := stub.GetState(ownerId)
	if err != nil {
		return shim.Error("addRecord operation failed. Error while getUserSummary " + err.Error())
	}
	if userSummaryValue == nil {
		return shim.Error("addRecord operation failed. ownerId not existed, please register the owner first ")
	}

	//add the patientRecord
	var record PatientRecord
	record = PatientRecord{recordId, ownerId, accessInfo, []string{}}
	newValue, err := json.Marshal(record)
	if err != nil {
		return shim.Error("addRecord Operation failed. Error while json.marshal(Record) " + err.Error())
	}
	err = stub.PutState(recordId, newValue)
	if err != nil {
		return shim.Error("addRecord Operation failed. Error while putstate(Record) " + err.Error())
	}

	//update the owner's summary
	var userSummary UserSummary
	err = json.Unmarshal(userSummaryValue, &userSummary)
	if err != nil {
		return shim.Error("addRecord Operation failed. Error while json.unmarshal(userSummary) " + err.Error())
	}
	userSummary.RecordList = append(userSummary.RecordList, recordId)
	userSummary.Count++
    newUserSummary, err := json.Marshal(userSummary)
	if err != nil {
		return shim.Error("addRecord Operation failed. Error while josn.marshal(UserSummary) " + err.Error())
	}
	err = stub.PutState(ownerId, newUserSummary)
	if err != nil {
		return shim.Error("addRecord Operation failed. Error while putstate(UserSummary) " + err.Error())
	}
	return shim.Success(nil)
}

//add the permission of the record for a user by record's owner
func (t *hospitalChaincode) addPermission(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 3 {
		return shim.Error("addPermission Operation must include three arguments(recordId, ownerId, userId)")
	}
	recordId := args[0]
	ownerId := args[1]
	userId := args[2]

	//get the record
	recordValue, err := stub.GetState(recordId)
	if err != nil {
		return shim.Error("addPermission Operation failed. Error while get the Record " + err.Error())
	}
	if recordValue == nil {
		return shim.Error("addPermission Operation failed. record not existed, please give the right recordId")
	}
	var patientRecord PatientRecord
	err = json.Unmarshal(recordValue, &patientRecord)
	if err != nil {
		return shim.Error("addPermission Operation failed. Error while json.unmarshal(record) " + err.Error())
	}

	//check the owner
	summaryValue, err := stub.GetState(userId)
	if err != nil {
		return shim.Error("addPermission Operation failed. Error while get user's Summary " + err.Error())
	}
	if summaryValue == nil {
		return shim.Error("addPermission Operation failed. user not existed, please give the right userId ")
	}
	if patientRecord.OwnerId != ownerId {
        return shim.Error("addPermission Operation failed. the owner isn't not equal, not have the right")
	}

	//add the permissionId into record
	//check the util of permissionId
	container := contain(userId, patientRecord.PermissionIdList)
	if container == true {
		return shim.Error("the permissionId is already in the permissionList")
	}
	patientRecord.PermissionIdList = append(patientRecord.PermissionIdList, userId)
	newPatientRecord, err := json.Marshal(patientRecord)
	if err != nil {
		return shim.Error("addPermission Operation failed. Error while json.marshal(newRecord) " + err.Error())
	}
	err = stub.PutState(recordId, newPatientRecord)
    if err != nil {
		return shim.Error("addPermission Operation failed. Error while putstate(newRecord) " + err.Error())
	}

	//update the user's summary
	var userSummary UserSummary
	err = json.Unmarshal(summaryValue, &userSummary)
	if err != nil {
		return shim.Error("addPermission Operation failed. Error while json.unmarshal(usersummary) " + err.Error())
	}
	userSummary.RecordList = append(userSummary.RecordList, recordId)
	userSummary.Count++
    newUserSummary, err := json.Marshal(userSummary)
	if err != nil {
		return shim.Error("addPermission Operation failed. Error while marshal(UserSummary) " + err.Error())
	}
	err = stub.PutState(userId, newUserSummary)
	if err != nil {
        return shim.Error("addPermission Operation failed. Error while putstate(newUserSummary) " + err.Error())
	}
	return shim.Success(nil)
}

//(recordId, ownerId, userId)
func (t *hospitalChaincode) removePermission(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 3 {
		return shim.Error("removePermission Operation must include three arguments(recordId, ownerId, userId)")
	}
	recordId := args[0]
	ownerId := args[1]
	userId := args[2]

	//get the record
	recordValue, err := stub.GetState(recordId)
	if err != nil {
		return shim.Error("removePermission Operation failed. Error while get the Record " + err.Error())
	}
	if recordValue == nil {
		return shim.Error("removePermission Operation failed. record not existed, please give the right recordId")
	}
	var patientRecord PatientRecord
	err = json.Unmarshal(recordValue, &patientRecord)
	if err != nil {
		return shim.Error("removePermission Operation failed. Error while json.unmarshal(record) " + err.Error())
	}
	//check the owner and user
	summaryValue, err := stub.GetState(userId)
	if err != nil {
		return shim.Error("removePermission Operation failed. Error while get user's Summary " + err.Error())
	}
	if summaryValue == nil {
		return shim.Error("removePermission Operation failed. user not existed, please give the right userId ")
	}
	if patientRecord.OwnerId != ownerId {
		return shim.Error("removePermission Operation failed. owner is not equal. don't have the right")

	}
	//remove the userId from record
	container := contain(userId, patientRecord.PermissionIdList)
	if container == false {
		return shim.Error("removePermission Operation failed. the permissionId don't have the permission already")
	}
	patientRecord.PermissionIdList = deleteValue(userId, patientRecord.PermissionIdList)
	newRecord, err := json.Marshal(patientRecord)
	if err != nil {
		return shim.Error("removePermission Operation failed. Error while json.marshal(newRecord) " + err.Error())
	}
	err = stub.PutState(recordId, newRecord)
	if err != nil {
		return shim.Error("removePermission Operation failed. Error while putstate(newRecord) " + err.Error())
	}
	//update the userSummary
	var userSummary UserSummary
	err = json.Unmarshal(summaryValue, &userSummary)
	if err != nil {
		return shim.Error("removePermission Operation failed. Error while json.unmarshal(userSummary) " + err.Error())
	}
	userSummary.RecordList = deleteValue(recordId, userSummary.RecordList)
	userSummary.Count--
	newUserSummary, err := json.Marshal(userSummary)
	if err != nil {
		return shim.Error("removePermission Operation failed. Error while json.Marshal(newUserSummary) " + err.Error())
	}
    err = stub.PutState(userId, newUserSummary)
	if err != nil {
		return shim.Error("removePermission Operation failed. Error while putstate(newUserSummary) " + err.Error())
	}
	return shim.Success(nil)
}

//(recordId, ownerId, accessInfo)
func (t *hospitalChaincode) updateAccessInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 3 {
		return shim.Error("updateAccessInfo Operation must include three arguments(recordId, ownerId, accessInfo)")
	}
	recordId := args[0]
	ownerId := args[1]
	accessInfo := args[2]

	//get the record
	recordValue, err := stub.GetState(recordId)
	if err != nil {
		return shim.Error("updateAccessInfo Operation failed. Error while get the Record " + err.Error())
	}
	if recordValue == nil {
		return shim.Error("updateAccessInfo Operation failed. record not existed, please give the right recordId")
	}
	var patientRecord PatientRecord
	err = json.Unmarshal(recordValue, &patientRecord)
	if err != nil {
		return shim.Error("updateAcessInfo Operation failed. Error while json.unmarshal(record)" + err.Error())
	}
	//check the owner
	if patientRecord.OwnerId != ownerId {
		return shim.Error("updateAccessInfo Operation failed. Owner is not equal,do not have the right. please give the right owneId ")
	}
	//update the accessInfo of the patientRecord
	patientRecord.AccessInfo = accessInfo
	newRecord, err := json.Marshal(patientRecord)
	if err != nil {
		return shim.Error("updateAccessInfo Operation failed. Error while json.marshal(newRecord) " + err.Error())
	}
	err = stub.PutState(recordId, newRecord)
	if err != nil {
		return shim.Error("updateAccessInfo Operation failed. Error while putstate(newRecord) " + err.Error())
	}
	return shim.Success(nil)

}

//(recordId, ownerId)
func (t *hospitalChaincode) getRecord(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 2 {
		return shim.Error("getRecord Operation must include two arguments(recordId, ownerId)")
	}

	recordId := args[0]
	ownerId := args[1]
	//get the record
	recordValue, err := stub.GetState(recordId)
	if err != nil {
		return shim.Error("getRecord Operation failed. Error while get the Record " + err.Error())
	}
	if recordValue == nil {
		return shim.Error("getRecord Operation failed. record not existed, please give the right recordId")
	}
    var patientRecord PatientRecord
	err = json.Unmarshal(recordValue, &patientRecord)
	if err != nil {
		return shim.Error("getRecord Operation failed. Error while json.unmarshal(record) " + err.Error())
	}
	//check the owner
	if patientRecord.OwnerId != ownerId {
		return shim.Error("getRecord Operation failed. Owner is not equal,don't have the right. please give the right owneId ")
	}
	return shim.Success(recordValue)

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

func (t *hospitalChaincode) havePermissionOwner(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 3 {
		return shim.Error("havePermissionOwner Operation must include three arguments(recordId, ownerId, userId)")
	}
	recordId := args[0]
	ownerId := args[1]
	userId := args[2]
	recordValue, err := stub.GetState(recordId)
	if err != nil {
		return shim.Error("havePermissionOwner Operation failed. Error while get the Record " + err.Error())
	}
	if recordValue == nil {
		return shim.Error("havePermissionOwner Operation failed. record not existed, please give the right recordId")
	}

	//check the owner
	var patientRecord PatientRecord
	err = json.Unmarshal(recordValue, &patientRecord)
	if err != nil {
		return shim.Error("havePermissionOwner Operation failed. Error while josn.unmarshal(record) " + err.Error())
	}
	if patientRecord.OwnerId != ownerId {
		return shim.Error("havePermissionOwner Operation failed. Owner is not equal,don't have the right. please give the right owneId ")
	}
	//check the permission
	container := contain(userId, patientRecord.PermissionIdList)
	if container == true {
		return shim.Success([]byte("True"))
	}
	return shim.Success([]byte("False"))

}

//(userId, recordId)
func (t *hospitalChaincode) havePermissionUser(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 2 {
		return shim.Error("havePermissionUser Operation must include two arguments(userId, recordId)")
	}

	userId := args[0]
	recordId := args[1]
	userSummaryValue, err := stub.GetState(userId)
	if err != nil {
        return shim.Error("havePermissionUser Operation failed. Error while getstate(userSummary) " + err.Error())
	}
	var userSummary UserSummary
	err = json.Unmarshal(userSummaryValue, &userSummary)
	if err != nil {
		return shim.Error("havePermissionUser Operation failed. Error while json.unmarshal(userSummary) " + err.Error())
	}
	container := contain(recordId, userSummary.RecordList)
	if container == true {
		return shim.Success([]byte("True"))
	}
	return shim.Success([]byte("False"))
}

//check list is contain the value or not
//(value, list)
func contain(value string, list []string) bool {
	for _, v := range list {
		if value == v {
			return true
		}
	}
	return false
}

//delete the value in the list
//need to change
func deleteValue(value string, list []string) []string {
	var resList []string
	for _, v := range list {
        if value == v {
			continue
		}
		resList = append(resList, v)
	}
	return resList
}
