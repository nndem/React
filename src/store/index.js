import companyReducer from './company';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import developerReducer from './developer';
import sessionReducer, {setup as sessionSetup} from './session';

import {logger} from 'redux-logger';

export default function initStore() {
  const middlewares = [logger];
  const reducers = combineReducers({
    developer: developerReducer,
    company: companyReducer,
    session: sessionReducer,
  });
  const store = createStore(reducers, {}, applyMiddleware(...middlewares));
  sessionSetup(store);

  return store;
}
