import React from 'react';
import '../App.css';
import { oauth2 as SMART } from "fhirclient";

export const Launcher = () => {
    SMART.authorize({
        clientId: "my-client-id",
        scope: "launch launch/patient patient/read offline_access",
        redirectUri: "./home",
        iss:
            "https://launch.smarthealthit.org/v/r3/sim/" +
            "eyJoIjoiMSIsImIiOiJmMDQ2MjkzNi1lYjRiLTRkYT" +
            "EtYjQ1YS1mYmQ5NmViZjhjY2IiLCJlIjoic21hcnQt" +
            "UHJhY3RpdGlvbmVyLTcxNjE0NTAyIn0/fhir",

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