import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Accordion, AccordionSummary, Button} from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classes from './InfoForDevelopers.module.css';
import constantsProjects from '../../../constants/projects';
import {useSelector} from 'react-redux';
import getUserEntities from '../EntitiesFromFirebase';
import constantDevelopers from '../../../constants/developers';

const InfoForDevelopers = () => {
  const [companies, setCompanies] = useState([]);

  const {isAuth} = useSelector((rootStore) => {
    return {
      isAuth: rootStore.session.isAuth,
    };
  });

  const getUsers = useCallback(async () => {
    return await getUserEntities('company');
  }, []);

  const mergedCompanies = useMemo(() => {
    return !!Array.isArray(companies) ? constantDevelopers.concat([...companies]) : constantsProjects;
  }, [companies]);

  useEffect(() => {
    if (!!!companies.length) {
      getUsers().then((res) => {
        setCompanies(Object.values(res));
      });
    }
  }, []);
  //console.log(getUserEntities('company'));
  console.log('Full list of companies:', constantsProjects);
  console.log('Full list of fetched companies:', companies);
  console.log('Merged', mergedCompanies);

  return (
    <>
      {isAuth
        ? mergedCompanies.map((element, i) => {
            return (
              <div key={i}>
                <Accordion>
                  <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<ExpandMoreIcon />}>
                    <img className={classes.logo} src={element?.logo} alt="icon" />
                    <Typography className={classes.heading} align="center" variant="h6">
                      {element.projName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{element.description}</Typography>
                  </AccordionDetails>
                  <Button variant="contained" color="primary">
                    Присоединиться к проекту
                  </Button>
                </Accordion>
              </div>
            );
          })
        : 'You are not logged'}
    </>
  );
};
export default InfoForDevelopers;
