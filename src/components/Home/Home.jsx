import React from 'react';
import {useSelector} from 'react-redux';
import InfoForDevelopers from './InfoForDevelopers/InfoForDevelopers';
import InfoForCompanies from './InfoForCompanies/InfoForCompanies';

export default function Home() {
  const userType = useSelector((rootStore) => rootStore.session.userType);
  console.log('userType:', userType);
  return <div>{userType === 'developer' ? <InfoForDevelopers /> : <InfoForCompanies />}</div>;
}
