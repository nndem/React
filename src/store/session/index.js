import {sessionReducer} from './reducer';

export function setup(store) {
  //
  // обратиться к firebase.auth.currentUser.  (при logout чистить localStorage и ~firebase.auth().logout)
  //
}

export default sessionReducer;
