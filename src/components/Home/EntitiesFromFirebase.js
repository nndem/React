import React from 'react';
import firebase from 'firebase';

// вынести в helpers
const getUserEntities = async (type) => {
  let entities = [];
  await firebase
    .database()
    .ref('users/')
    .orderByChild('userType')
    .equalTo(type)
    .once('value', (snap) => {
      entities = snap.val();
      console.log('Entities fetched:', entities);
    });
  return entities;
};

export default getUserEntities;
