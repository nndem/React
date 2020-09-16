import React, {useEffect, useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

export default function ProfileForDeveloper() {
  const [developerInfo, setDeveloperInfo] = useState(null);

  useEffect(() => {
    if (!!!developerInfo) {
      console.log('useEffect has worked11111');
      showDeveloperInfo();
    }
    /* showDeveloperInfo();*/
  }, [developerInfo]);

  const showDeveloperInfo = () => {
    // лучше брать из store, но пока берем из localStorage
    console.log('Developer Info:', JSON.parse(localStorage.getItem('Entity')));
    setDeveloperInfo(JSON.parse(localStorage.getItem('Entity')));
  };

  return (
    <>
      {'My Profile:'}
      <Card>
        <CardContent>
          <h1>
            <Typography>{developerInfo?.name}</Typography>
          </h1>
          <Typography>Experience: {developerInfo?.experience} year(s)</Typography>
          <Typography>Stack: {developerInfo?.stack}</Typography>
          <Typography>Email: {developerInfo?.email}</Typography>
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid item sm={12}>
              <Accordion>
                <AccordionSummary>About</AccordionSummary>
                <AccordionDetails>{developerInfo?.description || developerInfo?.about}</AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item sm={12}>
              <Button variant="outlined" onClick={() => alert('Профиль отредактирован!')}>
                Edit profile
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
}

//Todo: добавить список проектов, в которых участвует... + придумать логику для edit profile
