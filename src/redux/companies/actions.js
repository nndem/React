export const setPassword=(password)=>{
    return {
        type: 'SET_PASSWORD',
        payload: password
    }
}

export const setEmail=(email)=>{
    return {
        type: 'SET_EMAIL',
        payload: email
    }
}

export const setName=(name)=>{
    return {
        type: 'SET_NAME',
        payload: name
    }
}

export const setSurname=(surname)=>{
    return {
        type: 'SET_SURNAME',
        payload: surname

    }
}

export const setCity=(city)=>{
    return {
        type: 'SET_CITY',
        payload: city
    }
}



export const setCompanyName=(companyName)=>{
    return {
        type: 'SET_COMPANY_NAME',
        payload: companyName
    }
}

export const setHasAccountTrue=()=>{
    return {
        type: 'SET_HAS_ACCOUNT'
    }
}

export const setIsAuthTrue=()=>{
    return {
        type: 'SET_IS_AUTH'
    }

}

