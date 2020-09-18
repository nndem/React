import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Accordion, AccordionSummary, Button} from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classes from './InfoForDevelopers.module.css';
import {useSelector} from 'react-redux';
import getUserEntities from '../EntitiesFromFirebase';
import constantProjects from '../../../constants/projects';
import {JoinProjectButton} from './JoinProjectButton';

const InfoForDevelopers = () => {
  const [projects, setProjects] = useState([]);
  const isAuth = useSelector((rootStore) => rootStore.session.isAuth);
  const userType = useSelector((rootStore) => rootStore.session.authUser?.userType);

  const getUsers = useCallback(async () => {
    /*console.log("getUserEntities('project'):", await getUserEntities('project'));*/
    return await getUserEntities('project');
  }, []);

  const mergedProjects = useMemo(() => {
    return !!Array.isArray(projects) ? constantProjects.concat([...projects]) : constantProjects;
  }, [projects]);

  useEffect(() => {
    if (!!!projects.length) {
      getUsers().then((res) => {
        if (res) {
          setProjects(Object.values(res));
        } else {
          console.log('No project fetched');
        }
      });
    }
  }, []);

  console.log('Full list of projects:', constantProjects);
  console.log('Full list of fetched projects:', projects);
  console.log('Merged', mergedProjects);

  return (
    <>
      {isAuth
        ? mergedProjects.map((element, i) => {
            return (
              <div key={i}>
                <Accordion>
                  <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<ExpandMoreIcon />}>
                    {element.logo ? (
                      <img className={classes.logo} src={element?.logo} alt="icon" />
                    ) : (
                      element.companyName
                    )}
                    {/*<img className={classes.logo} src={element?.logo} alt="icon" />*/}

                    <Typography className={classes.heading} align="center" variant="h6">
                      {element.projectName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{element.description}</Typography>
                  </AccordionDetails>

                  {userType === 'developer' ? <JoinProjectButton /> : ''}

                  {/* <Button variant="contained" color="primary">
                    Присоединиться к проекту
                  </Button>*/}
                </Accordion>
              </div>
            );
          })
        : 'You are not logged'}
    </>
  );
};
export default InfoForDevelopers;
