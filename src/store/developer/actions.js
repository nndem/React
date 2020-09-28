import types from './types';

export const setDeveloperPassword = (password) => {
  console.log('dispatching SET_DEVELOPER_PASSWORD');
  return {
    type: types.SET_DEVELOPER_PASSWORD,
    payload: password,
  };
};

export const setDeveloperEmail = (email) => {
  console.log('dispatching SET_DEVELOPER_EMAIL');
  return {
    type: types.SET_DEVELOPER_EMAIL,
    payload: email,
  };
};

export const setDeveloperStack = (stack) => {
  console.log('dispatching SET_DEVELOPER_STACK');
  return {
    type: types.SET_DEVELOPER_STACK,
    payload: stack,
  };
};

export const setDeveloperExperience = (experience) => {
  console.log('dispatching SET_DEVELOPER_EXPERIENCE');
  return {
    type: types.SET_DEVELOPER_EXPERIENCE,
    payload: experience,
  };
};
