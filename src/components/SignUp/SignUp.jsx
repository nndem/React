// Общая Страница Регистрации


import React, {useState} from 'react';
import {useHistory } from 'react-router-dom'

import SignUpForCompany from "./SignUpForCompany";
import SignUpForDev from "./SignUpForDev";
import classes from "./SignUp.module.css";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";



export default function SignUp() {

    let history = useHistory(); // хук для перехода на другую страницу


    const [userType, setUserType] = useState(null);

    return (<>
            <form className={classes.form}>
                <FormLabel component="legend">Тип пользователя</FormLabel>
                <RadioGroup required="required" onChange={(e)=>setUserType(e.target.value)} >
                    <FormControlLabel value="developer" control={<Radio />} label="Developer" />
                    <FormControlLabel value="company" control={<Radio />} label="Company" />
                </RadioGroup>
            </form>

            {userType!== null && (userType ==='company' ? <SignUpForCompany/> : <SignUpForDev/>)}
            </>
    );
}
