
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
    axios.get(`${ROOT_URL}/chaincodex/query/${userID}`, { headers: getAuthorizedHeader() })
      .then(response => {
          console.log("自己所有病历列表")
        console.log(response)
          dispatch({type: FETCH_MDICALRECORD_LIST, payload: response})

      })
      .catch( response => dispatch(requestError(response.data.error)) );
  }
}

/**
 * 病历分享
 * @param page
 * @returns {Function}
 */
export function fetchMdicalrecordshare() {
    // const userId= localStorage.getItem('username');
    // console.log(userId)
    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/query/152626199102082112`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log("自己的病历分享")
                console.log(response)
                dispatch({type: FETCH_MDICALRECORD_SHARE, payload: response})

            })
            .catch( response => dispatch(requestError(response.data.error)) );
    }
}


/**
 * 消息通知列表
 */
export function fetchNewsList() {
    console.log("消息通知列表数据有了吗")
    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/query/getSummary`,{ headers: getAuthorizedHeader() })
            .then(response => {
                consolel.log("消息通知列表")
                console.log(response)
                dispatch({ type: FETCH_NEWS_LIST, payload:response })
            })
            .catch( err => dispatch(requestError(err.message)) );
    }
}
/**
 * 消息通知同意
 */
export function fetchNewsAgree({deadline,ownerid,permissiontype,recordid,userid}) {
    console.log(`点击同意需要传的数据: ${deadline}, ${ownerid}, ${permissiontype} ,${recordid} ,${userid}`);
    return function(dispatch) {
        axios.post(`${ROOT_URL}/chaincodex/deal`,{deadline,ownerid,permissiontype,recordid,userid}, { headers: getAuthorizedHeader() })
            .then(response => {
                consolel.log("消息通知列表")
                console.log(response)
                // dispatch({ type: FETCH_NEWS_AGREE, payload:response })
            })
            .catch( err => dispatch(requestError(err.message)) );
    }
}
/**
 * 消息通知拒绝
 */
export function fetchNewsRefuse({recordid,userid},callback) {
    console.log(`点击拒绝需要传的数据: ${recordid}, ${userid}`);
    return function(dispatch) {
        axios.post(`${ROOT_URL}/chaincodex/nodeal`,{recordid,userid}, { headers: getAuthorizedHeader() })
            .then(response => {
                consolel.log("消息通知列表")
                console.log(response)
                // dispatch({ type: FETCH_NEWS_REFUSE, payload:response })
            })
            .catch( err => dispatch(requestError(err.message)) );
    }
}


/**
 * 搜索病人病历结果
 */
export function fetchMdicalrecordsearch(userid) {
    console.log(userid)
    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/request/152626199102082135/beijingjingshenbingyiyuan/duziteng3`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log("搜索病历结果")
                console.log(response)
                dispatch({type: FETCH_SEARCH_LIST, payload: response})

            })
            .catch( response => dispatch(requestError(response.data.error)) );
    }
}
/**
 * 申请查看病人病历
 */

export function fetchRequestlook({ownerid,recordid,userid}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/chaincodex/request/permission`, {ownerid,recordid,userid},{ headers: getAuthorizedHeader() })
            .then(response => {
                console.log("申请查看")
                console.log(response)
                dispatch({type: FETCH_REQUEST_LOOK, payload: response})

            })
            .catch( response => dispatch(requestError(response.data.error)) );
    }
}

/**
 * 本院病历
 */

export function fetchMdicalrecordofours(hosptial) {
    console.log(hosptial)
    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/getHospitalRecord/${hosptial}`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log("本院病历")
                console.log(response)
                dispatch({type: FETCH_MDICALRECORDOFOURS_LIST, payload: response})

            })
            .catch( response => dispatch(requestError(response.data.error)) );
    }
}
/**
 * 查看本院de病历详情
 */

export function fetchdetialofours(num,callback) {
    console.log(num)
    // const userId= localStorage.getItem('username');
    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/query/152626199102082112`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log("查看本院病历详情")
                console.log(response)
                dispatch({type: FETCH_DETIAL_OFOURS, payload: response})

            })
            .catch( response => dispatch(requestError(response.data.error)) );
    }
}
/**
 * 查看病历详情
 */

export function fetchMdicalrecorddetial(num,callback) {
    console.log(num)
    // const userId= localStorage.getItem('username');
    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/query/152626199102082112`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log("查看病历详情")
                console.log(response)
                dispatch({type: FETCH_MDICALRECORD_DETIAL, payload: response})

            })
            .catch( response => dispatch(requestError(response.data.error)) );
    }
}