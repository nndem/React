import React from 'react';
import firebase from 'firebase';
import classes from './SignUp.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';

import {Button, TextField, Typography} from '@material-ui/core';
import {
  setDeveloperEmail,
  setDeveloperName,
  setDeveloperPassword,
  setDeveloperStack,
  setDeveloperSurname,
  setDeveloperExperience,
} from '../../store/developer/actions';
import {logIn, setUserType} from '../../store/sessionStore';

export default function SignUpForDev() {
  const dispatch = useDispatch();
  let history = useHistory();

  const {email, password} = useSelector((store) => {
    return {
      email: store.developer.developerEmail,
      password: store.developer.developerPassword,
    };
  });

  //СОЗДАНИЕ УЧЕТНОЙ ЗАПИСИ И ПЕРЕХОД НА СТРАНИЦУ HOME
  const createAccount = async (e) => {
    e.preventDefault(); //
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      dispatch(setUserType('developer'));
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
          Регистрация Нового Разработчика
        </Typography>

        <form className={classes.form} onSubmit={(e) => createAccount(e)}>
          <TextField
            onChange={(e) => dispatch(setDeveloperEmail(e.target.value))}
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
          />

          <TextField
            onChange={(e) => dispatch(setDeveloperPassword(e.target.value))}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <TextField
            onChange={(e) => dispatch(setDeveloperName(e.target.value))}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Name"
            label="Name"
            id="Name"
          />

          <TextField
            onChange={(e) => dispatch(setDeveloperSurname(e.target.value))}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Surname"
            label="Surname"
            id="Surname"
          />

          <TextField
            onChange={(e) => dispatch(setDeveloperStack(e.target.value))}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Stack"
            label="Stack"
            id="Stack"
          />

          <TextField
            onChange={(e) => dispatch(setDeveloperExperience(e.target.value))}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Experience"
            label="Experience"
            id="Experience"
          />

          <Button type="submit" color="primary" variant="contained">
            Зарегистрировать
          </Button>
        </form>
      </div>
    </>
  );
}
