import types from './types';

export const setDeveloperPassword = (password) => {
  return {
    type: types.SET_DEVELOPER_PASSWORD,
    payload: password,
  };
};

export const setDeveloperEmail = (email) => {
  return {
    type: types.SET_DEVELOPER_EMAIL,
    payload: email,
  };
};

export const setDeveloperName = (name) => {
  return {
    type: types.SET_DEVELOPER_NAME,
    payload: name,
  };
};

export const setDeveloperSurname = (surname) => {
  return {
    type: types.SET_DEVELOPER_SURNAME,
    payload: surname,
  };
};

export const setDeveloperStack = (stack) => {
  return {
    type: types.SET_DEVELOPER_STACK,
    payload: stack,
  };
};

export const setDeveloperExperience = (experience) => {
  return {
    type: types.SET_DEVELOPER_EXPERIENCE,
    payload: experience,
  };
};
