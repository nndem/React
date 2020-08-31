// Страница LogIn

import React from 'react';
import {useHistory} from 'react-router-dom';

import {Button, TextField, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';

import classes from './LogIn.module.css';
import {batch, useDispatch, useSelector} from 'react-redux';
import firebase from 'firebase';
import {logIn, setUserType} from '../../store/sessionStore';
import {useFormik} from 'formik';
import {setDeveloperEmail, setDeveloperPassword} from '../../store/developer/actions';
import {setCompanyEmail, setCompanyPassword} from '../../store/company/actions';

export default function LogIn() {
  const history = useHistory(); // хук для перехода на другую страницу
  const dispatch = useDispatch();

  //Firebase
  const SignIn = async (e) => {
    //e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
      //записать данные в store
      saveEmailAndPasswordToStore(values.email, values.password);

      dispatch(logIn()); //устанавливаем сессию

      history.push('/home');
    } catch (error) {
      console.error(error);
    }
  };

  const userType = useSelector((store) => store.session.userType);
  const saveEmailAndPasswordToStore = (email, password) => {
    if (userType === 'developer') {
      saveDeveloperEmailAndPassword(email, password);
    } else if (userType === 'company') {
      saveCompanyEmailAndPassword(email, password);
    }
  };

  const saveDeveloperEmailAndPassword = (email, password) => {
    batch(() => {
      dispatch(setDeveloperEmail(email));
      dispatch(setDeveloperPassword(password));
    });
  };

  const saveCompanyEmailAndPassword = (email, password) => {
    batch(() => {
      dispatch(setCompanyEmail(email));
      dispatch(setCompanyPassword(password));
    });
  };

  // Использование Formik
  const {handleSubmit, handleChange, values} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async () => {
      await SignIn();
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        //inputProps={}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="email"
        label="email"
        id="email"
        type="text"
        value={values.email}
      />

      <TextField
        //inputProps={}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="password"
        type="password"
        id="password"
        value={values.password}
      />

      <RadioGroup
        defaultValue="developer"
        required="required"
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
  );
}
