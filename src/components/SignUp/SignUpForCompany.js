//СОЗДАНИЕ УЧЕТНОЙ ЗАПИСИ COMPANY И ПЕРЕХОД НА СТРАНИЦУ HOME

import React from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import classes from './SignUp.module.css';
import firebase from 'firebase';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {logInProcessFailed, logInProcessSucceed, setUserType} from '../../store/session/actions';
import {useFormik} from 'formik';

export default function SignUpForCompany() {
  const dispatch = useDispatch();
  const history = useHistory();

  const createAccount = async () => {
    try {
      await registerOnServer(values.email, values.password);
      const authUser = firebase.auth().currentUser;
      console.log('authUser:', authUser);

      const companyModel = {
        id: authUser.uid,
        userType: 'company',
        email: values.email,
        companyName: values.companyName,
      };

      await createEntityInRealTimeDataBase(companyModel);

      const entity = await putEntityToLocalStorage(companyModel);
      dispatch(logInProcessSucceed(entity));
    } catch (error) {
      dispatch(logInProcessFailed(error.message));
      console.error(error);
    }
  };

  const registerOnServer = async (email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const createEntityInRealTimeDataBase = async (companyModel) => {
    await firebase
      .database()
      .ref('users/' + companyModel.id)
      .set({...companyModel});
  };

  const putEntityToLocalStorage = async (obj) => {
    await localStorage.setItem('Entity', JSON.stringify(obj));
    const data = JSON.parse(localStorage.getItem('Entity'));
    return data;
  };

  const loadPage = () => {
    console.log('REFERRING...');
    history.push('/profile');
    //history.push('/infoforcompanies');
  };

  const {handleSubmit, handleChange, values} = useFormik({
    initialValues: {
      email: '',
      password: '',
      companyName: '',
    },
    onSubmit: async () => {
      try {
        await createAccount();
        await loadPage();
      } catch (error) {
        console.error(error);
      }
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
