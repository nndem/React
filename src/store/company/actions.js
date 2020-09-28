import types from './types';

export const setCompanyPassword = (password) => {
  console.log('dispatching SET_COMPANY_PASSWORD');
  return {
    type: types.SET_COMPANY_PASSWORD,
    payload: password,
  };
};

export const setCompanyProjectsList = (projectsList) => {
  console.log('dispatching SET_COMPANY_PROJECTS_LIST');
  return {
    type: types.SET_COMPANY_PROJECTS_LIST,
    payload: projectsList,
  };
};
