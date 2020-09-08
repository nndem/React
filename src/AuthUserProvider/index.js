import React, {createContext, useCallback, useEffect, useState} from 'react';
import firebase from 'firebase';
import {logInProcessSucceed} from '../store/session/actions';
import {useDispatch} from 'react-redux';

export const AuthUserContext = createContext({authUser: null}); //создаем  контекст  [AuthUserContext.Provider, AuthUserContext.Consumer]

const AuthUserProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);

  const dispatch = useDispatch();

  const fetchAndDispatchEntityFromFireBase = useCallback(async (id) => {
    let userData = {};
    await firebase
      .database()
      .ref('users/' + id)
      .once('value', (snap) => {
        console.log('path to get is:', id);
        userData = snap.val();
      });
    setAuthUser(userData);
    setIsLoading(false);
    dispatch(logInProcessSucceed(userData));
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((fbAuthUser) => {
      if (fbAuthUser.uid && !fbAuthUser.isAnonymous) {
        fetchAndDispatchEntityFromFireBase(fbAuthUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  return <AuthUserContext.Provider value={authUser}> {!isLoading ? children : 'Loading...'} </AuthUserContext.Provider>; // сделать loader
};

export default AuthUserProvider;
