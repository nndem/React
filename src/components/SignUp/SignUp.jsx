// Общая Страница Регистрации
import React from 'react';
import SignUpForCompany from './SignUpForCompany';
import SignUpForDev from './SignUpForDev';
import classes from './SignUp.module.css';
import {FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {setUserType} from '../../store/sessionStore';

export default function SignUp() {
  const userType = useSelector((rootStore) => rootStore.session.userType); // что-то не сходится
  const dispatch = useDispatch();

  return (
    <>
      <form className={classes.form}>
        <FormLabel component="legend">Тип пользователя</FormLabel>
        <RadioGroup
          defaultValue="developer"
          required="required"
          onChange={(e) => dispatch(setUserType(e.target.value))}
        >
          <FormControlLabel value="developer" control={<Radio />} label="Developer" />
          <FormControlLabel value="company" control={<Radio />} label="Company" />
        </RadioGroup>
      </form>

      {userType !== null && (userType === 'company' ? <SignUpForCompany /> : <SignUpForDev />)}
    </>
  );
}
