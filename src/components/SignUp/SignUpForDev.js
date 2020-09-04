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
import {logIn, setUserType} from '../../store/session/actions';
import {useFormik} from 'formik';

export default function SignUpForDev() {
  const dispatch = useDispatch();
  const history = useHistory();

  const createAccount = async () => {
    const newDevObj = {
      id: new Date().getUTCMilliseconds(),
      userType: 'developer',
      email: values.email,
      password: values.password,
      name: values.name,
      surname: values.surname,
      stack: values.stack,
      experience: values.experience,
    };

    try {
      await registerOnServer(values.email, values.password);
      await writeDeveloperDataToServer(newDevObj);
      const data = await writeDataToLocalStorage(newDevObj);
      await dispatchDataToStore(data);
    } catch (error) {
      console.error(error);
    }
  };

  const registerOnServer = async (email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const writeDeveloperDataToServer = async (DevObj) => {
    await firebase
      .database()
      .ref('users/' + DevObj.id)
      .set({
        id: DevObj.id,
        userType: DevObj.userType,
        email: DevObj.email,
        password: DevObj.password,
        name: DevObj.name,
        surname: DevObj.surname,
        stack: DevObj.stack,
        experience: DevObj.experience,
      });
  };

  const writeDataToLocalStorage = async (obj) => {
    await localStorage.setItem('newDevObj', JSON.stringify(obj));
    const data = JSON.parse(localStorage.getItem('newDevObj'));
    return data;
  };

  const dispatchDataToStore = (obj) => {
    batch(() => {
      dispatch(setDeveloperEmail(obj.email));
      dispatch(setDeveloperPassword(obj.password));
      dispatch(setDeveloperName(obj.name));
      dispatch(setDeveloperSurname(obj.surname));
      dispatch(setDeveloperStack(obj.stack));
      dispatch(setDeveloperExperience(obj.experience));
      dispatch(setUserType(obj.userType));
      dispatch(logIn());
    });
  };

  const loadPage = () => {
    console.log('LOADING PAGE...');
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
