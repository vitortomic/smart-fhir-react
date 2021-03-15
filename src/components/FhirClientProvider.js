import React, { useState, useEffect } from "react";
import { oauth2 as SMART } from "fhirclient";
import { FhirClientContext } from "../FhirClientContext";

export const FhirClientProvider = (props) => {
    const [client, setClient] = useState(null)
    const [error, setError] = useState(null)

    const authorize = async () => {
      try {
        const client = await SMART.ready()
        setClient(client)
      }
      catch (error) {
        setError(error)
      }
    }

    useEffect(() => {
      if (!client) {
        authorize();
      }
    }, [authorize]);


    return (
      <FhirClientContext.Provider value={client}>
       { props.children }
      </FhirClientContext.Provider>
    );

}