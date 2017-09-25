

import _ from 'lodash';
import {
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  FETCH_NEWS_LIST,
} from '../actions/types';

const INITIAL_STATE = { all: [], item: null, reimburseResult: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REQUEST_SUCCESS:
      return { ...state, message: '操作成功', success:1 };
    case REQUEST_ERROR:
      return { ...state, message: action.payload, success:0 };
    case FETCH_NEWS_LIST:
      return { ...state, all:action.payload.data.data};
  }

  return state;
}