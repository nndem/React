// Страница LogIn

import React, {useEffect} from 'react';
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
  const {isLoading, isAuth, userType} = useSelector((rootStore) => {
    // подписал компонент на изменения stora
    return {
      isAuth: rootStore.session.isAuth,
      isLoading: rootStore.session.isLoading,
      userType: rootStore.session.authUser?.userType, //syntax sugar
    };
  });

  //const userType = useSelector((rootStore) => rootStore.session.userType);

  useEffect(() => {
    console.log(isAuth, userType);
    if (isAuth && userType) {
      loadPage(userType);
    }
  }, [isAuth, userType]); //функция срабатывает при изменении isAuth, т.е. функция зависит от свойства isAuth

  const loadPage = (userType) => {
    //dispatch(logIn());
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

  const SignIn = async () => {
    dispatch(logInProcessStart());

    try {
      const authUserCredits = await signInOnFirebase(values.email, values.password);
      const userId = authUserCredits.user.uid;

      const entity = await getEntityFromFirebase(userId);

      console.log('entity:', entity);

      await putEntityToLocalStorage(entity);

      dispatch(logInProcessSucceed(entity));
    } catch (error) {
      dispatch(logInProcessFailed(error.message));
    }
  };

  const getEntityFromFirebase = async (id) => {
    let data = {};
    await firebase
      .database()
      .ref('users/' + id)
      .once('value', (snap) => {
        console.log('path to get is:', id);
        console.log('snap.val:', snap.val());
        data = snap.val();
      });
    return data;
  };

  const signInOnFirebase = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const putEntityToLocalStorage = async (obj) => {
    await localStorage.setItem('Entity', JSON.stringify(obj));
    const entity = JSON.parse(localStorage.getItem('Entity'));
    return entity;
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
