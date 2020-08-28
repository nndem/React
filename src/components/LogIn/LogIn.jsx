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
import {Field, Formik} from 'formik';

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

        <Formik
          initialValues={{
            email: '',
            password: '',
            userType: 'developer',
          }}
          onSubmit={(values) => console.log('VALUES: ', values)}
        >
          {(props) => {
            return (
              <form className={classes.form}>
                <Field as="email" name="email" label="Email Address">
                  {({field, form, meta}) => {
                    console.log(field, meta);
                    return (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        inputProps={field}
                        //onChange={props.onChange}
                      />
                    );
                  }}
                </Field>

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
                  // type="submit" // привязывает кнопку к форме, onSubmit работает только на форме, поэтому пишут onClick, либо как я
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={props.submitForm}
                >
                  Войти
                </Button>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
