import React from 'react';
import {Accordion, AccordionSummary, Button} from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classes from './InfoForDevelopers.module.css';
import constantsProjects from '../../../constants/projects';

const InfoForDevelopers = () => {
  const projects = constantsProjects;
  return (
    <div>
      Список проектов:
      {projects.map((element, i) => {
        return (
          <div key={i}>
            <Accordion>
              <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<ExpandMoreIcon />}>
                <img className={classes.logo} src={element.logo} alt="icon" />
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
      })}
    </div>
  );
};
export default InfoForDevelopers;
