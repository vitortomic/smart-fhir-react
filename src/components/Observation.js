import React, { useState, useContext, useEffect, useRef } from "react";
import { FhirClientContext } from "../FhirClientContext";
import Chart from 'chart.js';

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

            const bmi = observations.entry.filter(observation => observation.resource.code.coding[0].code === '39156-5')
            .sort((a, b) => a.resource.valueQuantity.value - b.resource.valueQuantity.value)
            setBmi(bmi)
        }
        catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        if (client && !observations && !error) {
            fetchObservations();
        } else {
            initializeChart('bmi', ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], [12, 19, 3, 5, 2, 3], 'idx')
        }
      });
    
    const initializeChart = (label, labels, data, unit) => {
        new Chart(chartElement.current, {
            type: 'bar',
            data: {
                labels: labels, 
                datasets: [{
                    label: label,
                    data: data, 
                    backgroundColor: 'rgba(255, 99, 132, 0.2)', 
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
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
            <div style={{width:'400px',height:'400px'}}>
                <canvas ref={chartElement} width="400" height="400"></canvas>
            </div>
        </div>
    )
}

/*
Observations:
            <ul>
                {observations && observations.map(observation => (
                    <li>{observation.resource.code.coding[0].code} {observation.resource.code.coding[0].display}</li>
                ))}
            </ul>
*/