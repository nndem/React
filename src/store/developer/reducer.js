import types from './types';

const initialState = {
  developerEmail: null,
  developerPassword: null,
};

export const developerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DEVELOPER_NAME:
      return {...state, developerName: action.payload};

    case types.SET_DEVELOPER_SURNAME:
      return {...state, developerSurname: action.payload};

    case types.SET_DEVELOPER_EMAIL:
      return {...state, developerEmail: action.payload};

    case types.SET_DEVELOPER_PASSWORD:
      return {...state, developerPassword: action.payload};

    case types.SET_DEVELOPER_STACK:
      return {...state, developerStack: action.payload};

    case types.SET_DEVELOPER_EXPERIENCE:
      return {...state, developerExperience: action.payload};

    default:
      return state;
  }
};
