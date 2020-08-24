import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import classes from "./SignUp.module.css";
import {setUserType} from "../../old_store/store";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import React from "react";





export default function SelectUserType() {
    const handleSubmit = (e) =>{


    }



    return (<>
        <form className={classes.form}>
            <FormLabel component="legend">Тип пользователя</FormLabel>
            <RadioGroup required="required" onChange={(e)=>console.log(e)} >
                <FormControlLabel value="developer" control={<Radio />} label="Developer" />
                <FormControlLabel value="company" control={<Radio />} label="Company" />
            </RadioGroup>
        </form>
        </>
    );
}

