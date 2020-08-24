// Страница Авторизации

import  React from 'react';
import {useHistory } from 'react-router-dom'

import {
    Button,
    CssBaseline,
    TextField,
    Typography,
    Container,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    Radio


}from '@material-ui/core';

import classes from './SignIn.module.css'
import store, { signIn, setUserType, setUserName, setUserPassword, signOut} from '../../old_store/store'
import {useSelector} from 'react-redux'
import firebase from  'firebase'


export default function SignIn() {

    let history = useHistory(); // хук для перехода на другую страницу
    const email = useSelector(store=>store.user.userName)
    const password = useSelector(store=>store.user.userPassword)
    const isAuth = useSelector(store=>store.user.isAuth)
    const userName = useSelector(store=>store.user.userName)

    // С Firebase
    const createAccount= async (e) => {
        e.preventDefault();//

        // СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ в БД (РЕГИСТРАЦИЯ)
        /*      firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => console.log(error));        */


        // АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ (ЧЕРЕЗ БД)  - здесь происходит верификация с данными в БД
        /* firebase.auth().signInWithEmailAndPassword(email, password)
             .then(response =>{
                 store.dispatch(signIn()) //store обновляется при перезагрузке....надо что-то другое придумать
             } )
                .catch(error =>console.log(error))
     }*/

        //ES6
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            store.dispatch(signIn())
        } catch (error) {
            console.error(error)
        }
    }


    return (<>
            <CssBaseline />
            {console.log("userName from store:",userName)}

        {

            isAuth ?
                (
                    history.push("/home")
                )
                :
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">Вход в систему</Typography>

                    <form className={classes.form} onSubmit= {(e) =>createAccount(e)}>
                        <TextField onChange={ (e) =>  store.dispatch(setUserName(e.target.value))}  //изменяется state (userName: e.target.value)
                                   variant="outlined"
                                   margin="normal"
                                   required
                                   fullWidth
                                   id="email"
                                   label="Email Address"
                                   name="email"
                                   type="email"
                                   autoComplete="email"
                                   autoFocus/>

                        <TextField onChange={ (e) => store.dispatch(setUserPassword(e.target.value))} //изменяется state (userPassword: e.target.value)
                                   variant="outlined"
                                   margin="normal"
                                   required
                                   fullWidth
                                   name="password"
                                   label="Password"
                                   type="password"
                                   id="password"
                                   autoComplete="current-password" />

                        <FormLabel component="legend">Тип пользователя</FormLabel>
                        <RadioGroup defaultValue='developer' required="required" onChange={event=>store.dispatch(setUserType(event.target.value))}>
                            <FormControlLabel value="developer" control={<Radio />} label="Developer" />
                            <FormControlLabel value="company" control={<Radio />} label="Company" />
                        </RadioGroup>

                        <Button
                            type="submit"// привязывает кнопку к форме, onSubmit работает только на форме, поэтому пишут onClick, либо как я
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>Войти</Button>
                    </form>
                </div>
        }

        </>
    );
}
