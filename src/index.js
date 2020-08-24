import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './old_store/store'
import { Provider } from 'react-redux'

// firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyBBx5Y-7gJuT0-282VIapffMZkYT29iNCM",
    authDomain: "birzha-1297d.firebaseapp.com",
    databaseURL: "https://birzha-1297d.firebaseio.com",
    projectId: "birzha-1297d",
    storageBucket: "birzha-1297d.appspot.com",
    messagingSenderId: "216338903987",
    appId: "1:216338903987:web:538fc5086c41f06c6311c6"
};

firebase.initializeApp(firebaseConfig)
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,

    document.getElementById('root')
);


serviceWorker.unregister();
