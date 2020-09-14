import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import {useSelector} from 'react-redux';
import getUserEntities from '../EntitiesFromFirebase';
import constantDevelopers from '../../../constants/developers';

export default function InfoForCompanies() {
  const [developers, setDeveloper] = useState([]);
  const isAuth = useSelector((rootStore) => rootStore.session.isAuth);

  const getUsers = useCallback(async () => {
    return await getUserEntities('developer');
  }, []);

  const mergedDevelopers = useMemo(() => {
    return !!Array.isArray(developers) ? constantDevelopers.concat([...developers]) : constantDevelopers;
  }, [developers]);

  useEffect(() => {
    if (!!!developers.length) {
      getUsers().then((res) => {
        setDeveloper(Object.values(res));
      });
    }
  }, []);

  console.log('Full list of developers:', constantDevelopers);
  console.log('Full list of fetched developers:', developers);
  console.log('Merged', mergedDevelopers);

  return (
    <>
      {isAuth ? (
        <Grid container spacing={2}>
          {mergedDevelopers.map((element, i) => {
            /// тело
            return (
              <Grid key={i} item xs={3} spacing={3}>
                <Card>
                  <CardContent>
                    <h1>
                      <Typography>{element.name}</Typography>
                    </h1>
                    <Typography>Experience: {element.experience} year(s)</Typography>
                    <Typography>Stack: {element.stack}</Typography>
                    <Typography>Email: {element.email}</Typography>
                  </CardContent>
                  <CardActions>
                    <Grid container>
                      <Grid item sm={12}>
                        <Accordion>
                          <AccordionSummary>About</AccordionSummary>
                          <AccordionDetails>{element.description || element.about}</AccordionDetails>
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
}
