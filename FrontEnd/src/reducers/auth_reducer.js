/**
 * oxchain ivoice app
 *
 *
 * Author: Jun
 * Date: 19/04/2017
 *
 */

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload, authenticated: false };
  }

  return state;
}