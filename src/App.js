import React, {useEffect} from 'react';
import classes from './App.module.css';
import {Route} from 'react-router';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

import StartingPage from './components/StartingPage/StartingPage';
import Container from '@material-ui/core/Container/Container';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
import {Provider} from 'react-redux';
import initStore from './store';

const App = () => {
  const store = initStore();
  // Аналогично didMount
  useEffect(() => {
    const database = firebase.database();
    console.log(database);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={classes.container}>
          <Navbar />

          <Container maxWidth="lg">
            <Route path="/login" component={LogIn} />
            <Route path="/home" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route exact path="/" component={StartingPage} />
          </Container>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
