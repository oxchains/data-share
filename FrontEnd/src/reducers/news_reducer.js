
import {
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../actions/types';

const INITIAL_STATE = { all: [], item: null, reimburseResult: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REQUEST_SUCCESS:
      return { ...state, message: '操作成功', success:1 };
    case REQUEST_ERROR:
      return { ...state, message: action.payload, success:0 };
  }
  return state;
}