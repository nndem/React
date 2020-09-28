import types from './types';

const initialState = {
  companyEmail: null,
  companyPassword: null,
  companyProjects: null,
};

export const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_COMPANY_EMAIL:
      return {...state, companyEmail: action.payload};
    case types.SET_COMPANY_PASSWORD:
      return {...state, companyPassword: action.payload};
    case types.SET_COMPANY_NAME:
      return {...state, companyName: action.payload};

    case types.SET_COMPANY_PROJECTS_LIST:
      return {...state, companyProjects: action.payload};

    default:
      return state;
  }
};
