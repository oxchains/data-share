import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer';
import invoiceReducer from './news_reducer';
import reimburseReducer from './mdicalrecord_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  invoice: invoiceReducer,
  reimburse: reimburseReducer,
});

export default rootReducer;
