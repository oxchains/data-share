import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer';
import newsReducer from './news_reducer';
import mdicalrecordReducer from './mdicalrecord_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  newlist: newsReducer,
    mdicalrecordreducer: mdicalrecordReducer,
});

export default rootReducer;
