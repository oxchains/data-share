/**
 * oxchain ivoice app
 *
 *
 * Author: Jun
 * Email: iyakexi@gmail.com
 * Date: 20/04/2017
 *
 */

import axios from 'axios';
import {
  ROOT_URL,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
    FETCH_NEWS_LIST,
  getAuthorizedHeader,
  requestError
} from './types';



/**
 * 消息通知列表
 * @param page
 * @returns {Function}
 */
export function fetchNewsList(page) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/invoice`, { headers: getAuthorizedHeader() })
      .then(response => dispatch({ type: FETCH_NEWS_LIST, payload:response }))
      .catch( err => dispatch(requestError(err.message)) );
  }
}
