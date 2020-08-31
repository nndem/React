// Компонент Регистрации Developers

import React from 'react';

import {Button, TextField, Typography} from '@material-ui/core';

import classes from './SignUp.module.css';

import firebase from 'firebase';
import {batch, useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setCompanyName, setCompanyEmail, setCompanyPassword} from '../../store/company/actions';
import {logIn, setUserType} from '../../store/sessionStore';
import {useFormik} from 'formik';

export default function SignUpForCompany() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userType = useSelector((store) => store.session.userType);

  //СОЗДАНИЕ УЧЕТНОЙ ЗАПИСИ И ПЕРЕХОД НА СТРАНИЦУ HOME
  const createAccount = async (e) => {
    //e.preventDefault(); //
    try {
      await firebase.auth().createUserWithEmailAndPassword(values.email, values.password); //использовать другой метод с большими данными
      saveEmailAndPasswordAndUserTypeToStore(values.email, values.password);
      loadPage();
    } catch (error) {
      console.error(error);
    }
  };

  const saveEmailAndPasswordAndUserTypeToStore = (email, password) => {
    if (userType === 'company') {
      saveCompanyEmailAndUserTypePassword(email, password);
    }
  };
  const saveCompanyEmailAndUserTypePassword = (email, password) => {
    batch(() => {
      dispatch(setCompanyEmail(email));
      dispatch(setCompanyPassword(password));
      dispatch(setUserType('company'));
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
      companyName: '',
    },
    onSubmit: async () => {
      await createAccount();
    },
  });

  return (
    <>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Регистрация Новой Компании
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
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
            autoFocus
            onChange={handleChange}
            value={values.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="companyName"
            label="companyName"
            type="text"
            id="companyName"
            autoFocus
            onChange={handleChange}
            value={values.companyName}
          />

          <Button
            type="submit" // привязывает кнопку к форме, onSubmit работает только на форме, поэтому пишут onClick, либо как я
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Зарегистрировать
          </Button>
        </form>
      </div>
    </>
  );
}
