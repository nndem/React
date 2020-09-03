//СОЗДАНИЕ УЧЕТНОЙ ЗАПИСИ COMPANY И ПЕРЕХОД НА СТРАНИЦУ HOME

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
  const userType = useSelector((rootStore) => rootStore.session.userType);

  const createAccount = async () => {
    try {
      const newCompanyObj = {
        id: new Date().getUTCMilliseconds(),
        userType: 'company',
        email: values.email,
        password: values.password,
        companyName: values.companyName,
      };
      await writeCompanyDataToServer(newCompanyObj);
      let data = await readCompanyDataFromServer(newCompanyObj);
      await saveDataToStore(data);
      await loadPage();
    } catch (error) {
      console.error(error);
    }
  };

  const writeCompanyDataToServer = async (companyObj) => {
    console.log('write new object to server...');
    await firebase
      .database()
      .ref('companies/' + companyObj.id)
      .set({
        id: companyObj.id,
        userType: companyObj.userType,
        email: companyObj.email,
        password: companyObj.password,
        companyName: companyObj.companyName,
      });
  };

  const readCompanyDataFromServer = async (newCompanyObj) => {
    let data = {};
    firebase
      .database()
      .ref('companies/' + newCompanyObj.id)
      .on('value', (snap) => {
        data = snap.val();
      });
    return data;
  };

  const saveDataToStore = (obj) => {
    batch(() => {
      dispatch(setCompanyEmail(obj.email));
      dispatch(setCompanyPassword(obj.password));
      dispatch(setCompanyName(obj.companyName));
      dispatch(setUserType(userType));
    });
  };

  const loadPage = async () => {
    console.log('LOADING PAGE...');
    dispatch(logIn());
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
