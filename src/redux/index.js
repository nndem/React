import {companyReducer} from "./companies/reducer";

const reducer = combineReducers({
    developerReducer: developerReducer,
    companyReducer: companyReducer
})

export default reducer
