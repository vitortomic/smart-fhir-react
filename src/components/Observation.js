import React, { useState, useContext, useEffect, useRef } from "react";
import { FhirClientContext } from "../FhirClientContext";
import { Container, Box, Grid, Fade, Typography, Fab } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { StyledButton } from './StyledButton';
import { Spinner } from './Spinner';
import { TopBar } from './TopBar';
import { getObservations } from '../api'
import { PatientDetails } from './PatientDetails'
import Chart from 'chart.js';
import 'chartjs-plugin-annotation';
import moment from 'moment';

//for testing
import { addMockPatientData } from './mock/mockPatientData'

const codes = new Map()
codes.set('D-dimmer', '55449-3')
codes.set('crp', '30522-7')
codes.set('Leukocytes in blood', '6690-2')

const borders = new Map()
borders.set('D-dimmer', [{value: 0.5, direction: "<"}])
borders.set('crp', [{value: 5.0, direction: "<"}])
borders.set('Leukocytes in blood', [{value: 4.0, direction: ">"}, {value: 10.7, direction: "<"}])

let chartRef = null

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    wrapper: {
        padding: theme.spacing(4)
    },
    chart: {
        width:'1000px',
        height:'500px',
        margin: '50px'
    },
    title: {
        textAlign: 'center',
        margin: theme.spacing(2),
        color: 'grey'
    },
    fab: {
        position: 'fixed',
        bottom: '50px',
        right: '50px',
        color: 'white',
        fontWeight: 'bold'
    },
    alert: {
        marginTop: 50
    }
  }));

const getBorders = (testType) => {
   return borders.get(testType).map(border => {
       return {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: border.value,
        borderColor: '#FE6B8B',
        borderWidth: 5,
        label: {
            backgroundColor: '#FE6B8B',
            fontSize: 12,
            fontStyle: "bold",
            fontColor: "#fff",
            xPadding: 6,
            yPadding: 6,
            cornerRadius: 6,
            position: "center",
            xAdjust: 0,
            yAdjust: 0,
            enabled: true,
            content: `${border.direction} ${border.value}`
        },
       }
   })
}
  
export const Observation = () => {
    const classes = useStyles();
    const client = useContext(FhirClientContext)
    const [observations, setObservations] = useState(null)
    const chartElement = useRef(null);
    const [error, setError] = useState(null)
    const [ddimmer, setDdimmer] = useState(null)
    const [crp, setCrp] = useState(null)
    const [leukocytes, setLeukocytes] = useState(null)
    const [showAlert, setShowAlert] = useState(null)

    /* MOCK DATA */
    const [generateMockData, setGenerateMockData] = useState(false)
    const mockData = () => {
        setGenerateMockData(true)
        // here mock lab results relevant to covid-19 treatment are added for testing purposes
        addMockPatientData(observations)
        setObservations(observations)
    }
    /* MOCK DATA */

    const fetchObservations = async () => {
        try {
            const observations = await getObservations(client)
            setObservations(observations.entry)
            console.log(observations)
        }
        catch (error) {
            setError(error)
        }
    }

    const extractValues = (code) => {
        return observations.filter(observation => observation.resource.code.coding[0].code === code)
            .sort((a, b) => new Date(a.resource.issued) - new Date(b.resource.issued))
    }

    const extractDdimmer = () => {
        setCrp(null)
        setLeukocytes(null)
        setShowAlert(false)
        const ddimmer = extractValues(codes.get('D-dimmer'))
        if (ddimmer.length === 0) {
            setShowAlert(true)
        }
        setDdimmer(ddimmer)
    }

    const extractCrp = () => {
        setDdimmer(null)
        setLeukocytes(null)
        setShowAlert(false)
        const crp = extractValues(codes.get('crp'))
        if (crp.length === 0) {
            setShowAlert(true)
        }
        setCrp(crp)
    }

    const extractLeukocytes = () => {
        setDdimmer(null)
        setCrp(null)
        setShowAlert(false)
        const leukocytes = extractValues(codes.get('Leukocytes in blood'))
        if (leukocytes.length === 0) {
            setShowAlert(true)
        }
        setLeukocytes(leukocytes)
    }

    useEffect( () => {
        if (client && !observations && !error) {
            fetchObservations();
        }
        if (ddimmer && ddimmer.length > 0) {
            initializeChart(extractData(ddimmer), 'D-dimmer')
        }
        if (crp && crp.length > 0) {
            initializeChart(extractData(crp), 'crp')
        }
        if (leukocytes && leukocytes.length > 0) {
            initializeChart(extractData(leukocytes), 'Leukocytes in blood')
        } 
       
      });
    
    const extractData = (data) => {
        return {
          measurement: data[0].resource.code.coding[0].display,
          labels: data.map(element => moment(element.resource.issued).format('MMMM Do YYYY, h:mm:ss a')),
          data: data.map(element => parseFloat(element.resource.valueQuantity.value.toFixed(4))),
          unit: data[0].resource.valueQuantity.unit
        }
    }

    const initializeChart = ({measurement, labels, data, unit}, testType) => {
        if (chartRef) {
            chartRef.destroy()
        }
        chartRef = new Chart(chartElement.current, {
            type: 'bar',
            data: {
                labels: labels, 
                datasets: [{
                    label: measurement,
                    data: data, 
                    backgroundColor: '#FF8E53', 
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: unit
                        }
                    }],
                },
                tooltips: {
                    callbacks: {
                        label: (item) => `${item.yLabel} ${unit}`,
                    },
                },
                annotation: {
                    annotations: getBorders(testType),
                    drawTime: "afterDraw" // (default)
                }
            },
        });
    }
    
    return (
        <div>
            <TopBar />
            { !observations && (
                <Spinner />
            )}
            <PatientDetails />
            <Container style={{marginLeft:'300px'}}>
                { !generateMockData && <Fab className={classes.fab} onClick={mockData} color="primary" variant="extended">
                    Generate test observations
                </Fab>}
                <Fade in={observations}>
                    <Box className={classes.wrapper}>
                        { observations && (
                            <>
                                <Typography className={classes.title}>Choose one of the lab results below:</Typography>
                                <Grid
                                className={classes.root}
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={4}>
                                    <Grid item><StyledButton onClick={extractDdimmer}>D-dimmer</StyledButton></Grid>
                                    <Grid item><StyledButton onClick={extractCrp}>CRP</StyledButton></Grid>
                                    <Grid item><StyledButton onClick={extractLeukocytes}>Leukocytes</StyledButton></Grid>
                                </Grid> 
                            </>
                        )}
                        <Fade in={showAlert}>
                            <Alert className={classes.alert} onClose={() => {setShowAlert(false)}} severity="warning">Patient does not have lab results for the selected type! </Alert>
                        </Fade>
                        <Fade in={ddimmer || leukocytes || crp}>
                            <Box className={classes.chart}>
                                <canvas ref={chartElement} width="800" height="400"></canvas>
                            </Box>
                        </Fade>
                    </Box>
                </Fade>
            </Container>
        </div>
    )
}
