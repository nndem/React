import React from 'react';
import {useSelector} from 'react-redux';
import ProfileForCompany from './ProfileForCompany';
import ProfileForDeveloper from './ProfileForDeveloper';

const Profile = () => {
  const isAuth = useSelector((rootStore) => rootStore.session.isAuth);
  const userType = useSelector((rootStore) => rootStore.session.authUser?.userType);

  return (
    <>
      {console.log('CURRENT USERTYPE IS:', userType)}
      {isAuth && userType !== null && userType === 'company' ? <ProfileForCompany /> : ''}
      {isAuth && userType !== null && userType === 'developer' ? <ProfileForDeveloper /> : ''}
    </>
  );
};

export default Profile;

