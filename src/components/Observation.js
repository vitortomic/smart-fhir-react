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
            const bmiChart = new Chart(chartElement.current, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
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
                    }
                }
            });
        }
      });
    
    return (
        <div>
            BMI:
             <ul>
                {bmi && bmi.map(bmiReading => (
                    <li>Measured on {bmiReading.resource.issued} value: {bmiReading.resource.valueQuantity.value}{bmiReading.resource.valueQuantity.unit}</li>
                ))}
             </ul>
            <br/>
            <canvas ref={chartElement} width="400" height="400"></canvas>
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