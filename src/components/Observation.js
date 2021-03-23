import React, { useState, useContext, useEffect } from "react";
import { FhirClientContext } from "../FhirClientContext";

export const Observation = () => {
    const client = useContext(FhirClientContext)
    const [observations, setObservations] = useState(null)
    const [error, setError] = useState(null)

    const fetchObservations = async () => {
        try {
            const observations = await client.patient.request("Observation")
            setObservations(observations.entry)
        }
        catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        if (client && !observations && !error) {
            fetchObservations();
        }
      }, [fetchObservations]);
    
    return (
        <div>
            Observations:
            <ul>
                {observations && observations.map(observation => (
                    <li>{observation.resource.code.coding[0].code} {observation.resource.code.coding[0].display}</li>
                ))}
            </ul>
        </div>
    )
}
