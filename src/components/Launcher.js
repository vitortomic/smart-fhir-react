import React, { useEffect } from 'react';
import '../App.css';
import { oauth2 as SMART } from "fhirclient";
import queryString from 'query-string'

const FALLBACK_ISS = "https://launch.smarthealthit.org/v/r3/sim/" +
    "eyJoIjoiMSIsImIiOiJmMDQ2MjkzNi1lYjRiLTRkYT" +
    "EtYjQ1YS1mYmQ5NmViZjhjY2IiLCJlIjoic21hcnQt" +
    "UHJhY3RpdGlvbmVyLTcxNjE0NTAyIn0/fhir"

export const Launcher = () => {
    let iss
    if (window.location.search) {
        const parsed = queryString.parse(window.location.search);
        if (parsed.iss) {
            iss = parsed.iss
        }
    }

    useEffect(() => {
        SMART.settings.fullSessionStorageSupport = !(window.external && typeof window.external.DiscernObjectFactory !== 'undefined')
        SMART.authorize({
            clientId: "ade8d11b-898f-42dd-9d84-5bac2b1cd8b3",// epic:"6c12dff4-24e7-4475-a742-b08972c4ea27",
            scope: "patient/Patient.read patient/Observation.read patient/Immunization.read patient/MedicationStatement.read patient/Condition.Read launch offline_access openid profile",
            redirectUri: "./home",
            iss: iss ? iss : FALLBACK_ISS,
    
            // WARNING: completeInTarget=true is needed to make this work
            // in the codesandbox frame. It is otherwise not needed if the
            // target is not another frame or window but since the entire
            // example works in a frame here, it gets confused without
            // setting this!
            completeInTarget: true
        });
      });    


    return (
        <div className="App">
           Launching...
        </div>
      )
}