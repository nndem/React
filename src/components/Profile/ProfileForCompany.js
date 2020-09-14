import React, {useEffect, useState} from 'react';
import * as firebase from 'firebase';

export default function ProfileForCompany() {
  const [projectList, setProjectList] = useState(null);

  const showProjects = async () => {
    try {
      const onlyCompaniesList = await getOnlyCompaniesList();
      const companyName = getCompanyName();
      const currentCompanyProjects = getCurrentCompanyProjects(onlyCompaniesList, companyName);
      console.log('currentCompanyProjects:', currentCompanyProjects);
      setProjectList(Object.values(currentCompanyProjects) || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // тянуть данные из stora, если их  нет то выполить запрос на сервер и записываю в store
    //  пока он всегда тянет актуальные данные

    if (!!!projectList) {
      // если projectsList не пустой,то выполнится. А он и так пустой, потому что его иници
      showProjects();
    }
  }, [projectList]);

  const getOnlyCompaniesList = async () => {
    let listOfCompanyFetched = [];
    await firebase
      .database()
      .ref('users/')
      .orderByChild('userType')
      .equalTo('company')
      .once('value', (snap) => {
        const entitiesFetched = snap.val();
        console.log('entitiesFetched:', entitiesFetched);
        listOfCompanyFetched.push(entitiesFetched);
        // entitiesFetched.map((company) => listOfCompanyFetched.push(company));

        console.log('listOfCompanyFetched:', listOfCompanyFetched);
      });
    return listOfCompanyFetched;
  };

  const getCompanyName = () => {
    //Todo: брать со stora
    return localStorage.getItem('Entity').companyName || localStorage.getItem('Entity').companyName;
  };

  const getCurrentCompanyProjects = (companyList, companyName) => {
    console.log('companyList:', companyList);
    return companyList.filter((element) => element.companyName === companyName) || console.log('No Current Projects');
  };

  return (
    <>
      <ul>
        {projectList?.map((el) => {
          return <li>{el?.projectName || 'Projects'}</li>;
        })}
      </ul>
      <button> add new project</button>
    </>
  );
}
