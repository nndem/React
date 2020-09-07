import types from './types';

export const setCompanyPassword = (password) => {
  console.log('dispatching SET_COMPANY_PASSWORD');
  return {
    type: types.SET_COMPANY_PASSWORD,
    payload: password,
  };
};

export const setCompanyEmail = (email) => {
  console.log('dispatching SET_COMPANY_EMAIL');
  return {
    type: types.SET_COMPANY_EMAIL,
    payload: email,
  };
};

export const setCompanyName = (companyName) => {
  console.log('dispatching SET_COMPANY_NAME');
  return {
    type: types.SET_COMPANY_NAME,
    payload: companyName,
  };
};
