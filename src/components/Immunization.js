import React, { useState, useContext, useEffect } from "react";
import { FhirClientContext } from "../FhirClientContext";
import { getImmunizations } from '../api'

export const Immunization = () => {
    const client = useContext(FhirClientContext)
    const [immunizations, setImmunizations] = useState(null)
    const [error, setError] = useState(null)

    const fetchImmunizations = async () => {
        try {
            const immunizations = await getImmunizations(client)
            setImmunizations(immunizations.entry)
        }
        catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        if (client && !immunizations && !error) {
            fetchImmunizations();
        }
      }, [fetchImmunizations]);
    
    return (
        <div>
            Immunizations:
            <ul>
                {immunizations && immunizations.map(immunization => (
                    <li> {immunization.resource.vaccineCode.text} {immunization.resource.date} </li>
                ))}
            </ul>
        </div>
    )
}
