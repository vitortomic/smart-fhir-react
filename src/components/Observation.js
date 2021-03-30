import React, { useState, useContext, useEffect, useRef } from "react";
import { FhirClientContext } from "../FhirClientContext";
import Chart from 'chart.js';
import moment from 'moment';

export const Observation = () => {
    const client = useContext(FhirClientContext)
    const [observations, setObservations] = useState(null)
    const [bmi, setBmi] = useState(null)
    const chartElement = useRef(null);
    const [error, setError] = useState(null)

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

    const extractBmi = () => {
        const bmi = observations.filter(observation => observation.resource.code.coding[0].code === '39156-5')
            .sort((a, b) => new Date(a.resource.issued) - new Date(b.resource.issued))
        setBmi(bmi)
    }

    useEffect( () => {
        if (client && !observations && !error) {
            fetchObservations();
        }
        if (observations && !bmi) {
            extractBmi()
        }
        if (bmi && bmi.length > 0) {
            //initializeChart('bmi', ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], [12, 19, 3, 5, 2, 3], 'idx')
            initializeChart(extractData(bmi))
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
            BMI:
             <ul>
                {bmi && bmi.map(bmiReading => (
                    <li>Measured on {bmiReading.resource.issued} value: {bmiReading.resource.valueQuantity.value}{bmiReading.resource.valueQuantity.unit}</li>
                ))}
             </ul>
            <br/>
            <div style={{width:'1000px',height:'500px', margin: '50px'}}>
                <canvas ref={chartElement} width="800" height="400"></canvas>
            </div>
        </div>
    )
}
