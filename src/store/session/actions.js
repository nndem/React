import types from './types';

/*export const setUserType = (userType) => {
  return {
    type: types.SET_USER_TYPE,
    payload: userType,
  };
};*/

export const logInProcessStart = () => {
  return {
    type: types.LOGIN_PROCESS_START,
  };
};

export const logInProcessSucceed = (authUser) => {
  return {
    type: types.LOGIN_PROCESS_SUCCEED,
    payload: authUser,
  };
};

export const logInProcessFailed = (error) => {
  return {
    type: types.LOGIN_PROCESS_FAILED,
    payload: error,
  };
};

export const logIn = () => {
  return {
    type: types.LOG_IN,
  };
};

export const LogOut = () => {
  return {
    type: types.LOG_OUT,
  };
};
