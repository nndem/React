import {companyState, developerState} from "./store";




export const companyReducer = (state, action) => {
    switch (action.type){
        case "SET_PASSWORD":
            return  {...state, password: action.payload}
        case "SET_EMAIL":
            return  {...state, email: action.payload}
        case "SET_COMPANY_NAME":
            return  {...state, companyName: action.payload}
        case "SET_CITY":
            return  {...state, city: action.payload}
        case "SET_HAS_ACCOUNT":
            return  {...state, hasAccount: true}
        case  "SET_IS_AUTH":
            return  {...state, isAuth:true}

        default: state

    }
}
