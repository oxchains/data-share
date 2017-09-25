
import {
    FETCH_MDICALRECORD_LIST,
    FETCH_MDICALRECORDOFOURS_LIST,
} from '../actions/types';

const INITIAL_STATE = { all: []};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_MDICALRECORD_LIST:{
        console.log(JSON.parse(action.payload.data.data).UserName)
        return { ...state, all:JSON.parse(action.payload.data.data)};

    }
    case FETCH_MDICALRECORDOFOURS_LIST:
      return { ...state, all:action.payload.data.data };
  }

  return state;
}