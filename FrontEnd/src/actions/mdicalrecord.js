

import axios from 'axios';
import {
  ROOT_URL,
  REQUEST_ERROR,
    FETCH_MDICALRECORD_LIST,
    FETCH_SEARCH_LIST,
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
export function fetchMdicalrecordList() {
    // const userId= localStorage.getItem('username');
    // console.log(userId)
  return function(dispatch) {
    axios.get(`${ROOT_URL}/chaincodex/query/152626199102082112`, { headers: getAuthorizedHeader() })
      .then(response => {
        //   console.log("response")
        // console.log(response)
          dispatch({type: FETCH_MDICALRECORD_LIST, payload: response})

      })
      .catch( response => dispatch(requestError(response.data.error)) );
  }
}

/**
 * 搜索病人病历结果
 */
export function fetchMdicalrecordsearch() {
    const userId= localStorage.getItem('username');
    console.log(userId)
    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/query/{userId}`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log(response)
                dispatch({type: FETCH_SEARCH_LIST, payload: response})

            })
            .catch( response => dispatch(requestError(response.data.error)) );
    }
}

/**
 * 本院病历
 */

export function fetchMdicalrecordofours() {
    const userId= localStorage.getItem('username');
    console.log(userId)
    return function(dispatch) {
        axios.get(`${ROOT_URL}/chaincodex/query/{userId}`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log(response)
                dispatch({type: FETCH_MDICALRECORDOFOURS_LIST, payload: response})

            })
            .catch( response => dispatch(requestError(response.data.error)) );
    }
}