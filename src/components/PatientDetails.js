import React, { useState, useContext, useEffect } from "react";
import { FhirClientContext } from "../FhirClientContext";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Drawer, Divider, Box, Fade } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({  
    drawer: {
        width: 300,
        flexShrink: 0,
        zIndex: -2,
    },
    drawerPaper: {
        width: 300,
        zIndex: -2
    },
    title: {
        marginTop: 100,
        padding: 20,
        color: theme.palette.text.secondary
    },
    patientDetails: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary
    },
  }));

export const PatientDetails = () => {
    const classes = useStyles();
    const client = useContext(FhirClientContext)
    const [patient, setPatient] = useState(null)
    const [error, setError] = useState(null)

    const fetchPatient = async () => {
        try {
            const patient = await client.patient.read()
            setPatient(patient)
        }
        catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        if (client && !patient && !error) {
            fetchPatient();
        }
      }, [fetchPatient]);

    return (
    <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        PaperProps={{ elevation: 8 }}
        classes={{
            paper: classes.drawerPaper,
        }}
      > 
        <Typography className={classes.title} variant="h5">Patient Details</Typography>
        <Divider />
        <Fade in={patient} >
            <Box className={classes.patientDetails}>
                { patient && <Typography><b>Name:</b> {`${patient.name[0].prefix} ${patient.name[0].given[0]} ${patient.name[0].family}`}</Typography>}
                <br />
                { patient && <Typography><b>Gender:</b> {`${patient.gender}`}</Typography>}
                <br />
                { patient && <Typography><b>DoB:</b> {`${moment(patient.birthDate).format('MMMM Do YYYY')}`}</Typography>}
            </Box>
        </Fade>
        <Divider />
    </Drawer>
  )

}
