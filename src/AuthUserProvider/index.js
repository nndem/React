import React, {createContext, useCallback, useEffect, useState} from 'react';
import firebase from 'firebase';
import {logInProcessSucceed} from '../store/session/actions';
import {useDispatch} from 'react-redux';
import Loader from '../components/Loader/Loader';

export const AuthUserContext = createContext({authUser: null}); //создаем  контекст  [AuthUserContext.Provider, AuthUserContext.Consumer]

const AuthUserProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const dispatch = useDispatch();

  const fetchAndDispatchEntityFromFireBase = useCallback(async (id) => {
    setIsLoading(true);
    let userData = {};
    await firebase
      .database()
      .ref('users/' + id)
      .once('value', (snap) => {
        console.log('path to get is:', id);
        userData = snap.val();
      });
    setAuthUser(userData);
    dispatch(logInProcessSucceed(userData));
    setIsLoading(false);
    console.log('GET USER FROM FIREBASE');
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((fbAuthUser) => {
      console.log('fbAuthUser:', fbAuthUser);
      if (fbAuthUser && fbAuthUser.uid && !fbAuthUser.isAnonymous) {
        fetchAndDispatchEntityFromFireBase(fbAuthUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  return <AuthUserContext.Provider value={authUser}> {!isLoading ? children : <Loader />} </AuthUserContext.Provider>; // сделать loader
};

export default AuthUserProvider;
