import React from 'react'
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
}from '@material-ui/core';
import store from '../../../old_store/store'
import {useSelector} from 'react-redux'


const InfoForCompanies = () => {

    const developers = useSelector(store => store.developers)
    console.log('developers:', store.getState().developers)

    return (
            <>
            <Grid container spacing={2}>   {/*Grid-контейнер с отступами для элементов в 2 пробела*/}
                {developers.map((dev, i) => {
                    return (
                        <Grid key={i} item xs={3} spacing={3}>
                                <Card>
                                    <CardContent >
                                        <h1><Typography>{dev.name}</Typography></h1>
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
                    )
                }) }
            </Grid>

            </>

                )}

export default InfoForCompanies

