// Компонент Регистрации Developers

import  React from 'react';


import {
    Button,
    CssBaseline,
    TextField,
    Typography,

}from '@material-ui/core';

import classes from './SignUp.module.css'

import firebase from  'firebase'
import {
    setCity,
    setEmail,
    setExperience,
    setHasAccountTrue, setIsAuthTrue,
    setName,
    setPassword,
    setStack,
    setSurname
} from "../../redux/companies/actions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

export default function SignUpForCompany() {

    const dispatch = useDispatch()

    const email = useSelector(store=>store.user.userName) // redux-ducks
    const password = useSelector(store=>store.user.userPassword) // redux-ducks
    let history = useHistory()


    const createAccount = async (e) => {
        e.preventDefault();//

        //СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ-КОМПАНИЯ в БД (РЕГИСТРАЦИЯ)
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            //store.dispatch(signIn())      // redux-ducks
            dispatch(setHasAccountTrue()) // redux-ducks for company
            dispatch(setIsAuthTrue())   // redux-ducks for company
            history('/home')// переход на страницу home
        } catch (error) {
            console.error(error)
        }
    }


    return (<>
            <CssBaseline />

            <div className={classes.paper}>
                <Typography component="h1" variant="h5">Регистрация Developer</Typography>

                <form className={classes.form} onSubmit= {(e) => createAccount(e)}>
                    <TextField id='email' label ='Email' placeholder='Email' onChange={  (e)=>  dispatch(setEmail(e.target.value))  }/>

                    <TextField id='password' label ='Password' placeholder='Пароль' required onChange={  (e)=>dispatch(setPassword(e.target.value))  }/>

                    <TextField id='name' label ='outlined' placeholder='Введите имя' required onChange= {  (e) => dispatch(setName(e.target.value))} />

                    <TextField id='surname' label ='outlined' placeholder='Введите фамилию' required onChange={  (e)=>dispatch(setSurname(e.target.value))}/>

                    <TextField id='city' label= 'outlined' placeholder='Введите город' required onChange={(e)=>dispatch(setCity(e.target.value))  } />


                    <Button type="submit" color="primary" variant="contained">Зарегистрироваться</Button>

                </form>
            </div>*/



        </>
    );
}
