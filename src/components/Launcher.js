import React from 'react';
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
    
    SMART.authorize({
        clientId: "my-client-id",
        scope: "launch launch/patient patient/read offline_access",
        redirectUri: "./home",
        iss: iss ? iss : FALLBACK_ISS,

        // WARNING: completeInTarget=true is needed to make this work
        // in the codesandbox frame. It is otherwise not needed if the
        // target is not another frame or window but since the entire
        // example works in a frame here, it gets confused without
        // setting this!
        completeInTarget: true
    });

    return (
        <div className="App">
           Launching...
        </div>
      )
}