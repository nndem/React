import React from 'react';
import {useSelector} from 'react-redux';
import InfoForDevelopers from './InfoForDevelopers/InfoForDevelopers';
import InfoForCompanies from './InfoForCompanies/InfoForCompanies';

export default function Home() {
  const userType = useSelector((rootStore) => rootStore.session.userType);
  const isAuth = useSelector((rootStore) => rootStore.session.isAuth);
  return (
    <div>
      {isAuth && userType === 'developer' ? (
        <InfoForDevelopers />
      ) : isAuth ? (
        <InfoForCompanies />
      ) : (
        'You are not logged'
      )}
    </div>
  );
}
