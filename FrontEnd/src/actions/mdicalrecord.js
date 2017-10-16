import axios from 'axios';
import {
  ROOT_URL,
  REQUEST_ERROR,
    FETCH_MDICALRECORD_LIST,
    FETCH_MDICALRECORDOFOURS_LIST,
    FETCH_SEARCH_LIST,
    FETCH_NEWS_LIST,
    FETCH_MDICALRECORD_DETIAL,
    FETCH_DETIAL_OFOURS,
    FETCH_REQUEST_LOOK,
    FETCH_MDICALRECORD_SHARE,
    FETCH_NEWS_AGREE,
    FETCH_NEWS_REFUSE,
  getAuthorizedHeader
} from './types';

export function requestError(error) {
  return {
    type: REQUEST_ERROR,
    payload: error
  };
}

/**
 * 所有自己病历列表
 * @param page
 * @returns {Function}
 */
export function fetchMdicalrecordList(userID) {
    // console.log(userID)
  return function(dispatch) {
    axios.get(`${ROOT_URL}/chaincodex/query/ownerRecord?ownerid=${userID}`,{ headers: getAuthorizedHeader() })
      .then(response => {
          console.log("自己所有病历列表")
        console.log(response)
          dispatch({type: FETCH_MDICALRECORD_LIST, payload: response})
      })
      .catch( response => {
          console.error(response)
          // dispatch(requestError(response.data.error))
      });
  }
}

/**
 * 病历分享
 * @param page
 * @returns {Function}
 */
export function fetchMdicalrecordshare({ownerid,recordid,userid,providerid,deadline,permissiontype,healtime,healailment}) {
    console.log(`点击共享需要传的数据: ${ownerid}, ${recordid} ,${providerid},${userid} ,${deadline},${permissiontype},${healtime},${healailment}`);
    return function(dispatch) {
        axios.post(`${ROOT_URL}/chaincodex/shareRecord`, {ownerid,recordid,userid,providerid,deadline,permissiontype,healtime,healailment},{ headers: getAuthorizedHeader() })
            .then(response => {
                console.log("自己的病历分享")
                console.log(response)
                dispatch({type: FETCH_MDICALRECORD_SHARE, payload: response})

            })
            .catch( response => {
                console.error(response)
                // dispatch(requestError(response.data.error))
            });
    }
}
/**
 * 消息通知列表
 */
export function fetchNewsList() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/getMessageData`,{ headers: getAuthorizedHeader() })
            .then(response => {
                console.log("消息通知列表")
                console.log(response)
                dispatch({ type: FETCH_NEWS_LIST, payload:response })
            })
            .catch( err => dispatch(requestError(err.message)) );
    }
}
/**
 * 消息通知同意
 */
export function fetchNewsAgree({recordid, ownerid, userid, permissiontype, deadline}) {
    console.log(`点击同意需要传的数据: ${recordid}, ${ownerid}, ${userid} ,${permissiontype} ,${deadline}`);
    return function(dispatch) {
        axios.post(`${ROOT_URL}/chaincodex/deal`,{recordid, ownerid, userid, permissiontype, deadline}, { headers: getAuthorizedHeader() })
            .then(response => {
                // console.log("点击了同意")
                // console.log(response)
                dispatch({ type: FETCH_NEWS_AGREE, payload:response })
            })
            .catch( err => dispatch(requestError(err.message)) );
    }
}
/**
 * 消息通知拒绝
 */
export function fetchNewsRefuse({recordid, ownerid},callback) {
    console.log(`点击拒绝需要传的数据: ${recordid}, ${ownerid}`);
    return function(dispatch) {
        axios.post(`${ROOT_URL}/chaincodex/nodeal`,{recordid, ownerid}, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log("点击了拒绝")
                console.log(response)
                dispatch({ type: FETCH_NEWS_REFUSE, payload:response })
            })
            .catch( err => dispatch(requestError(err.message)) );
    }
}


/**
 * 搜索病人病历结果
 */
export function fetchMdicalrecordsearch(ownerid) {
    // console.log(ownerid,hospital)
    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/searchPatientRecord/${ownerid}`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log("搜索病历结果")
                console.log(response)
                dispatch({type: FETCH_SEARCH_LIST, payload: response})

            })
            .catch( response => dispatch(requestError(response)));
    }
}
/**
 * 申请查看病人病历
 */

export function fetchRequestlook({ownerid,recordid,requesthospital}) {
    console.log(`点击申请需要传的数据: ${ownerid}, ${recordid}，${requesthospital}`)
    return function(dispatch) {
        axios.post(`${ROOT_URL}/chaincodex/request/permission`, {ownerid,recordid,requesthospital},{ headers: getAuthorizedHeader() })
            .then(response => {
                console.log("申请查看接口通了")
                console.log(response)
                dispatch({type: FETCH_REQUEST_LOOK, payload: response})
            })
            .catch( response => {
                console.error(response)
                // dispatch(requestError(response.data.error))
            });
    }
}

/**
 * 本院病历
 */

export function fetchMdicalrecordofours(hosptial) {
    console.log(hosptial)
    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/queryHospitalRecord/${hosptial}`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log("本院病历")
                console.log(response)
                dispatch({type: FETCH_MDICALRECORDOFOURS_LIST, payload: response})

            })
            .catch( response => dispatch(requestError(response.data.error))
            );
    }
}
/**
 * 查看本院de病历详情
 */

export function fetchdetialofours(id) {

    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/queryRecordDetails?id=${id}`, { headers: getAuthorizedHeader() })
            .then(response => {
                // console.log("查看本院病历详情")
                // console.log(response)
                dispatch({type: FETCH_DETIAL_OFOURS, payload: response})

            })
            .catch( response => dispatch(requestError(response.data.error)) );
    }
}
/**
 * 查看个人病历详情
 */

export function fetchMdicalrecorddetial(id) {
    // console.log(id)
    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/showShareRecord?id=${id}`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log("查看个人病历详情")
                console.log(response)
                dispatch({type: FETCH_MDICALRECORD_DETIAL, payload: response})

            })
            .catch( response => dispatch(requestError(response.data.error)) );
    }
}