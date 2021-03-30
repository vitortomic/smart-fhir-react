import React, { useState, useContext, useEffect, useRef } from "react";
import { FhirClientContext } from "../FhirClientContext";
import Chart from 'chart.js';
import moment from 'moment';

const codes = new Map()
codes.set('bmi', '39156-5')
codes.set('body weight', '29463-7')
codes.set('body height', '8302-2')

export const Observation = () => {
    const client = useContext(FhirClientContext)
    const [observations, setObservations] = useState(null)
    const chartElement = useRef(null);
    const [error, setError] = useState(null)

    const [bmi, setBmi] = useState(null)
    const [bodyWeight, setBodyWeight] = useState(null)
    const [bodyHeight, setBodyHeight] = useState(null)

    const fetchObservations = async () => {
        try {
            const observations = await client.patient.request("Observation")
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

    const extractBmi = () => {
        setBodyWeight(null)
        setBodyHeight(null)
        const bmi = extractValues(codes.get('bmi'))
        setBmi(bmi)
    }

    const extractBodyWeight = () => {
        setBmi(null)
        setBodyHeight(null)
        const bodyWeight = extractValues(codes.get('body weight'))
        setBodyWeight(bodyWeight)
    }

    const extractBodyHeight = () => {
        setBmi(null)
        setBodyWeight(null)
        const bodyHeight = extractValues(codes.get('body height'))
        setBodyHeight(bodyHeight)
    }

    useEffect( () => {
        if (client && !observations && !error) {
            fetchObservations();
        }
        if (bmi && bmi.length > 0) {
            initializeChart(extractData(bmi))
        }
        if (bodyWeight && bodyWeight.length > 0) {
            initializeChart(extractData(bodyWeight))
        }
        if (bodyHeight && bodyHeight.length > 0) {
            initializeChart(extractData(bodyHeight))
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

    const initializeChart = ({measurement, labels, data, unit}) => {
        new Chart(chartElement.current, {
            type: 'bar',
            data: {
                labels: labels, 
                datasets: [{
                    label: measurement,
                    data: data, 
                    backgroundColor: 'rgb(186, 48, 48)', 
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
                }
            }
        });
    }
    
    return (
        <div>
            { observations && (
                <>
                    <button onClick={extractBmi}>bmi</button>
                    <button onClick={extractBodyWeight}>body weight</button>
                    <button onClick={extractBodyHeight}>body height</button>
                </>
            )}
            <div style={{width:'1000px',height:'500px', margin: '50px'}}>
                <canvas ref={chartElement} width="800" height="400"></canvas>
            </div>
        </div>
    )
}
