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

export const setDeveloperName = (name) => {
  console.log('dispatching SET_DEVELOPER_NAME');
  return {
    type: types.SET_DEVELOPER_NAME,
    payload: name,
  };
};

export const setDeveloperSurname = (surname) => {
  console.log('dispatching SET_DEVELOPER_SURNAME');
  return {
    type: types.SET_DEVELOPER_SURNAME,
    payload: surname,
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
