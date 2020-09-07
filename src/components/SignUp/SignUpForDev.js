//СОЗДАНИЕ УЧЕТНОЙ ЗАПИСИ DEVELOPER И ПЕРЕХОД НА СТРАНИЦУ HOME

import React from 'react';
import firebase from 'firebase';
import classes from './SignUp.module.css';
import {batch, useDispatch, useSelector} from 'react-redux';
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
import {logInProcessFailed, logInProcessStart, logInProcessSucceed, setUserType} from '../../store/session/actions';
import {useFormik} from 'formik';

export default function SignUpForDev() {
  const dispatch = useDispatch();
  const history = useHistory();

  const createAccount = async () => {
    try {
      dispatch(logInProcessStart());
      await registerOnServer(values.email, values.password);
      const authUser = firebase.auth().currentUser;
      console.log('authUser:', authUser);

      const developerModel = {
        id: authUser.uid,
        userType: 'developer',
        email: values.email,
        password: values.password,
        name: values.name,
        surname: values.surname,
        stack: values.stack,
        experience: values.experience,
      };

      await createEntityInRealTimeDataBase(developerModel);

      const entity = await putEntityToLocalStorage(developerModel);
      dispatch(logInProcessSucceed(entity));
    } catch (error) {
      dispatch(logInProcessFailed(error.message));
      console.error(error);
    }
  };

  const registerOnServer = async (email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const createEntityInRealTimeDataBase = async (developerModel) => {
    await firebase
      .database()
      .ref('users/' + developerModel.id)
      .set({...developerModel});
  };

  const putEntityToLocalStorage = async (obj) => {
    await localStorage.setItem('Entity', JSON.stringify(obj));
    const data = JSON.parse(localStorage.getItem('Entity'));
    return data;
  };

  const loadPage = () => {
    console.log('REFERRING...');
    history.push('/infofordevelopers');
  };

  const {handleSubmit, handleChange, values} = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      surname: '',
      stack: '',
      experience: '',
    },
    onSubmit: async () => {
      await createAccount();
      await loadPage();
    },
  });

  return (
    <>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Регистрация Нового Разработчика
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
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
            onChange={handleChange}
            value={values.email}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={values.password}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="name"
            id="name"
            onChange={handleChange}
            value={values.name}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="surname"
            label="surname"
            id="surname"
            onChange={handleChange}
            value={values.surname}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="stack"
            label="stack"
            id="stack"
            onChange={handleChange}
            value={values.stack}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="experience"
            label="experience"
            id="experience"
            onChange={handleChange}
            value={values.experience}
          />

          <Button type="submit" color="primary" variant="contained">
            Зарегистрировать
          </Button>
        </form>
      </div>
    </>
  );
}
