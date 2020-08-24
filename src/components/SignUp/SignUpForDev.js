// Компонент Регистрации Developers

import  React from 'react';
//import {useHistory } from 'react-router-dom'

import {
    Button,
    CssBaseline,
    TextField,
    Typography,


}from '@material-ui/core';

import classes from './SignUp.module.css'

import firebase from  'firebase'
import {
    setCity, setCompanyName,
    setEmail,
    setExperience,
    setHasAccountTrue, setIsAuthTrue,
    setName,
    setPassword,
    setStack,
    setSurname
} from "../../redux/developers/actions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";





export default function SignUpForDev() {

    const dispatch = useDispatch() // новый  Хук

    const email = useSelector(store=>store.user.userName) // redux-ducks
    const password = useSelector(store=>store.user.userPassword) // redux-ducks
    let history = useHistory()

    const createAccount = async (e) => {
        e.preventDefault();//

        //СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ в БД (РЕГИСТРАЦИЯ)
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            dispatch(setHasAccountTrue())  // redux-ducks for developer
            dispatch(setIsAuthTrue())
            history('/home')// redux-ducks for developer
        } catch (error) {
            console.error(error)
        }
    }



    return (<>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">Регистрация Developer</Typography>

                <form className={classes.form} onSubmit= {(e) => createAccount(e)}>

                    <TextField id='email' label ='Email' placeholder='Email' onChange={ (e)=> dispatch(setEmail(e.target.value))}/>
                    <TextField id='password' label ='Password' placeholder='Пароль' required onChange={ (e)=> dispatch(setPassword(e.target.value))} />
                    <TextField id='companyName' label ='outlined' placeholder='Введите название компании' required onChange={ (e)=> dispatch(setCompanyName(e.target.value))} />
                    <TextField id='stacks' label= 'outlined' placeholder='Введите технологии' required onChange={  (e)=>dispatch(setCompanyName(e.target.value))} />
                    <TextField id='city' label= 'outlined' placeholder='Введите город' required onChange={   (e)=>dispatch(setCity(e.target.value))} />
                    <TextField id='experience' label= 'outlined' placeholder='Опыт' required onChange={   (e)=>dispatch(setExperience(e.target.value))} />

                    <Button type="submit" color="primary" variant="contained">Зарегистрироваться</Button>

                </form>
            </div>
        </>
    );
}
