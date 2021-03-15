import React, { useState, useContext, useEffect } from "react";
import { FhirClientContext } from "../FhirClientContext";

export const Patient = () => {
    const client = useContext(FhirClientContext)
    const [patient, setPatient] = useState(null)
    const [error, setError] = useState(null)

    const fetchPatient = async () => {
        try {
            const patient = await client.patient.read()
            console.log(patient)
            setPatient(patient)
        }
        catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        if (client && !patient) {
            fetchPatient();
        }
      }, [fetchPatient]);
    
    return (
        <div>
            { patient && <span>Patient name: {`${patient.name[0].given[0]} ${patient.name[0].family}`}</span>}
            <br/>
            { patient && <span>Patient phone number: {patient.telecom[0].value}</span>}
        </div>
    )
}