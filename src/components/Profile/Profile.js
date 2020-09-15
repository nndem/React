import React from 'react';
import {useSelector} from 'react-redux';
import ProfileForCompany from './ProfileForCompany';

const Profile = () => {
  //const isAuth = useSelector((rootStore) => rootStore.session.isAuth);
  //const userType = useSelector((rootStore) => rootStore.session.authUser.userType);
  return (
    <>
      <ProfileForCompany />

      {/*
      {isAuth && userType !== null && (userType === 'company' ? <ProfileForCompany /> : <ProfileForDeveloper />)}
*/}
    </>
  );
};

export default Profile;
