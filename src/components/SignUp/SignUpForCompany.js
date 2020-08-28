// Компонент Регистрации Developers

import React from 'react';

import {Button, TextField, Typography} from '@material-ui/core';

import classes from './SignUp.module.css';

import firebase from 'firebase';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setCompanyName, setCompanyEmail, setCompanyPassword} from '../../store/company/actions';
import {logIn, setUserType} from '../../store/sessionStore';

export default function SignUpForCompany() {
  const dispatch = useDispatch();

  const {email, password} = useSelector((store) => {
    return {
      email: store.company.companyEmail,
      password: store.company.companyPassword,
    };
  });
  const history = useHistory();

  //СОЗДАНИЕ УЧЕТНОЙ ЗАПИСИ И ПЕРЕХОД НА СТРАНИЦУ HOME
  const createAccount = async (e) => {
    e.preventDefault(); //
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      dispatch(setUserType('company'));
      dispatch(logIn());

      history.push('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Регистрация Новой Компании
        </Typography>

        <form className={classes.form} onSubmit={(e) => createAccount(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => dispatch(setCompanyEmail(e.target.value))}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => dispatch(setCompanyPassword(e.target.value))}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="CompanyName"
            label="CompanyName"
            //type="password"
            id="Name"
            onChange={(e) => dispatch(setCompanyName(e.target.value))}
          />

          <Button type="submit" color="primary" variant="contained">
            Зарегистрировать
          </Button>
        </form>
      </div>
    </>
  );
}
