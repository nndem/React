import types from './types';

const initialState = {
  authUser: null,
  isAuth: false,
  isLoading: false,
  userType: 'developer',
};

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_PROCESS_START:
      return {...state, isLoading: true};

    case types.LOGIN_PROCESS_SUCCEED:
      return {...state, isLoading: false, isAuth: true, authUser: action.payload};

    case types.LOGIN_PROCESS_FAILED:
      return {...state, isLoading: false, isAuth: false, authUser: null};

    case types.SET_USER_TYPE:
      return {...state, userType: action.payload};

    case types.LOG_IN:
      return {...state, isAuth: true};

    case types.LOG_OUT:
      return {...state, isAuth: false, authUser: null};

    default:
      return state;
  }
};
