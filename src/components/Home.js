import React from "react";
import { FhirClientProvider } from "./FhirClientProvider";
import { Patient } from './Patient'
import { Observation } from './Observation'
import { Immunization } from './Immunization'

export const Home = () => {
    return (
        <FhirClientProvider>
            <>
                <Patient />
                <Observation />
                <Immunization />
            </>
        </FhirClientProvider>
      )
}