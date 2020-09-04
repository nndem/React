import React from 'react';
import {
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import constantsDevelopers from '../../../constants/developers';
import {useSelector} from 'react-redux';

const InfoForCompanies = () => {
  const isAuth = useSelector((rootStore) => rootStore.session.isAuth);
  const developers = constantsDevelopers; // Добавить dev из БД
  return (
    <>
      {isAuth ? (
        <Grid container spacing={2}>
          {' '}
          {developers.map((dev, i) => {
            return (
              <Grid key={i} item xs={3} spacing={3}>
                <Card>
                  <CardContent>
                    <h1>
                      <Typography>{dev.name}</Typography>
                    </h1>
                    <Typography>Experience: {dev.experience} year(s)</Typography>
                    <Typography>Stack: {dev.stack.join(' , ')}</Typography>
                    <Typography>Email: {dev.email}</Typography>
                  </CardContent>
                  <CardActions>
                    <Grid container>
                      <Grid item sm={12}>
                        <Accordion>
                          <AccordionSummary>About</AccordionSummary>
                          <AccordionDetails>{dev.description}</AccordionDetails>
                        </Accordion>
                      </Grid>
                      <Grid item sm={12}>
                        <Button variant="outlined">Start chatting</Button>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        'You are not logged'
      )}
    </>
  );
};

export default InfoForCompanies;
