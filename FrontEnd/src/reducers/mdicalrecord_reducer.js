
import {
    FETCH_MDICALRECORD_LIST,
    FETCH_MDICALRECORDOFOURS_LIST,
    FETCH_NEWS_LIST,
    FETCH_SEARCH_LIST,
    FETCH_MDICALRECORD_SHARE,
    FETCH_DETIAL_OFOURS,
    FETCH_REQUEST_LOOK,
} from '../actions/types';

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
      case FETCH_MDICALRECORD_LIST:
        return { ...state, all:JSON.parse(action.payload.data.data)};
      case FETCH_MDICALRECORDOFOURS_LIST:{
          return { ...state, all:action.payload.data.data };
      }
      case FETCH_SEARCH_LIST:
          return { ...state, all:JSON.parse(action.payload.data.data) };
      case FETCH_NEWS_LIST:
          return { ...state, all:JSON.parse(action.payload.data.data)};
      case FETCH_MDICALRECORD_SHARE:
          return { ...state, all:JSON.parse(action.payload.data.data)};
      case FETCH_DETIAL_OFOURS:
          return { ...state, all:JSON.parse(action.payload.data.data)};
      case FETCH_REQUEST_LOOK:
          return { ...state, all:JSON.parse(action.payload.data.data)};
  }

  return state;
}


