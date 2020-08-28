// Страница LogIn

import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

import classes from './LogIn.module.css';
import {useDispatch} from 'react-redux';
import firebase from 'firebase';
import {logIn, setUserType} from '../../store/sessionStore';

export default function LogIn() {
  const history = useHistory(); // хук для перехода на другую страницу
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Firebase
  const SignIn = async (e) => {
    e.preventDefault(); //
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(logIn()); //устанавливаем сессию
      history.push('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/*<CssBaseline/>*/}
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Вход в систему
        </Typography>

        <form className={classes.form} onSubmit={(e) => SignIn(e)}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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

          <FormLabel component="legend">Тип пользователя</FormLabel>
          <RadioGroup
            defaultValue="developer"
            required="required"
            //параметр для установки сессии
            onChange={(event) => dispatch(setUserType(event.target.value))}
          >
            <FormControlLabel value="developer" control={<Radio />} label="Developer" />
            <FormControlLabel value="company" control={<Radio />} label="Company" />
          </RadioGroup>

          <Button
            type="submit" // привязывает кнопку к форме, onSubmit работает только на форме, поэтому пишут onClick, либо как я
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
        </form>
      </div>
    </>
  );
}
