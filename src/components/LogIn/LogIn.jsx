// Страница LogIn

import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button, TextField} from '@material-ui/core';
import classes from './LogIn.module.css';
import {useDispatch, useSelector} from 'react-redux';
import firebase from 'firebase';
import {logIn, logInProcessFailed, logInProcessStart, logInProcessSucceed} from '../../store/session/actions';
import {useFormik} from 'formik';

export default function LogIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((rootStore) => rootStore.session.isLoading);

  const SignIn = async () => {
    dispatch(logInProcessStart());

    try {
      const authUserCredits = await signInOnFirebase(values.email, values.password);
      const userId = authUserCredits.user.uid;

      const user2 = await getUserFromFirebase(userId);

      console.log('user2:', user2);

      //await writeDataToLocalStorage(userInfoFromFirebase);

      //dispatch(logInProcessSucceed(userInfoFromFirebase));
    } catch (error) {
      //dispatch(logInProcessFailed(error));
    }
  };

  const getUserFromFirebase = async (id) => {
    let data = {};
    await firebase
      .database()
      .ref('users/' + id)
      .once('value', (snap) => {
        data = snap.val();
      });
    return data;
  };

  const signInOnFirebase = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const writeDataToLocalStorage = async (obj) => {
    await localStorage.setItem('CurrentObj', JSON.stringify(obj));
    const data = JSON.parse(localStorage.getItem('CurrentObj'));
    return data;
  };

  const loadPage = (userType) => {
    dispatch(logIn()); //устанавливаем сессию
    const path = homePage(userType);
    history.push(path);
  };

  const homePage = (userType) => {
    let path;
    if (userType === 'developer') {
      path = '/infofordevelopers';
    } else if (userType === 'company') {
      path = '/infoforcompanies';
    } else {
      path = '';
    }
    return path;
  };

  // Использование Formik
  const {handleSubmit, handleChange, values} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (userType) => {
      try {
        await SignIn();
        //await loadPage(userType);
      } catch (error) {
        console.error(error);
      }
    },
  });
  if (isLoading) {
    return <> Loading...</>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
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
