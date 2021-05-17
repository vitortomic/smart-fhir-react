const getPatient = async (client) => {
    return await client.patient.read()
}

const getObservations = async (client) => {
    return await client.patient.request("Observation")
}

const getImmunizations = async (client) => {
    return await client.patient.request("Immunization")
}

export {
    getPatient,
    getObservations,
    getImmunizations
}

