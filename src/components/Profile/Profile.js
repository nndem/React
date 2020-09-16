import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProfileForCompany from './ProfileForCompany';
import ProfileForDeveloper from './ProfileForDeveloper';
import {logInProcessFailed, logInProcessStart, logInProcessSucceed} from '../../store/session/actions';

const Profile = () => {
  const isAuth = useSelector((rootStore) => rootStore.session.isAuth);
  const userType = useSelector((rootStore) => rootStore.session.authUser?.userType);
  //const userType = useSelector((rootStore) => rootStore.session.userType);

  return (
    <>
      {console.log('CURRENT USERTYPE IS:', userType)}
      {isAuth && userType !== null && userType === 'company' ? <ProfileForCompany /> : ''}
      {isAuth && userType !== null && userType === 'developer' ? <ProfileForDeveloper /> : ''}
    </>
  );
};

export default Profile;

/*useEffect чтобы при перезагрузке данные повторно записывались в store*/
