import React from "react";
import { FhirClientProvider } from "./FhirClientProvider";
import { Patient } from './Patient'

export const Home = () => {
    return (
        <FhirClientProvider>
            <Patient />
        </FhirClientProvider>
      )
}