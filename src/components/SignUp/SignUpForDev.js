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
import {logIn, setUserType} from '../../store/sessionStore';
import {useFormik} from 'formik';

export default function SignUpForDev() {
  const dispatch = useDispatch();
  let history = useHistory();
  const userType = useSelector((store) => store.session.userType);

  //СОЗДАНИЕ УЧЕТНОЙ ЗАПИСИ И ПЕРЕХОД НА СТРАНИЦУ HOME
  const createAccount = async (e) => {
    //e.preventDefault(); //
    try {
      await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
      saveEmailAndPasswordAndUserTypeToStore(values.email, values.password);
      loadPage();
    } catch (error) {
      console.error(error);
    }
  };

  const saveEmailAndPasswordAndUserTypeToStore = (email, password) => {
    if (userType === 'developer') {
      saveDeveloperEmailAndUserTypePassword(email, password);
    }
  };
  const saveDeveloperEmailAndUserTypePassword = (email, password) => {
    batch(() => {
      dispatch(setDeveloperEmail(email));
      dispatch(setDeveloperPassword(password));
      dispatch(setUserType('developer'));
    });
  };

  const loadPage = () => {
    dispatch(logIn()); //устанавливаем сессию
    history.push('/home');
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
