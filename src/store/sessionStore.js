const SET_USER_TYPE = 'SET_USER_TYPE';
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

const initialState = {
  userType: null,
  isAuth: false,
};

export const setUserType = (userType) => {
  return {
    type: SET_USER_TYPE,
    payload: userType,
  };
};

export const logIn = () => {
  return {
    type: LOG_IN,
  };
};

export const LogOut = () => {
  return {
    type: LOG_OUT,
  };
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TYPE:
      return {...state, userType: action.payload};
    case LOG_IN:
      return {...state, isAuth: true}; // почему-то удаляется
    case LOG_OUT:
      return {...state, isAuth: false, userType: null};

    default:
      return state;
  }
};

export default sessionReducer;
