import React, {useEffect} from 'react';
import classes from './App.module.css'
import { Route } from 'react-router'
import SignIn from './components/SingIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import { BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'

import InfoPage from './components/InfoPage/InfoPage'
import Container from '@material-ui/core/Container/Container'
import store from './old_store/store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'
import { setUserName } from './old_store/store'


const App = () => {

    useEffect(()=>{             // Аналогично didMount
        const db = firebase.database();
        console.log(db)

        //Просто небольшая тренировка в БД Firebase
        /*
        const userName = db.ref('userName');  //получаем объект (поле со значением)

        userName.on('value', (elem)=>{       //извлекаем значение из объекта
            console.log('userName from DB:', elem.val())
            store.dispatch(setUserName(elem.val()))
        //console.log("userName from DB:",store.getState().user.userName)
        });
*/
    })

    return (
          <BrowserRouter>
          <div className={classes.container}>
            <Navbar/>
              <Container maxWidth="lg" >
                  <Route path='/signin'  component={SignIn} />
                  <Route path='/home' component={Home}/>
                  <Route exact path='/' component={InfoPage}/>
                  <Route path='/signup' component={SignUp} />
              </Container>

          </div>
          </BrowserRouter>
  );
}

export default App;
