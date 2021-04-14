
export const addMockPatientData = (entries) => {
    const mockData = [
        getSampleEntry({
            text: "D-dimmer",
            code: "55449-3",
            unit: "ug FEU/mL",
            issuedTimestamp: "2021-01-20T03:01:00.045-04:00",
            value: 0.1
        }),
        getSampleEntry({
            text: "D-dimmer",
            code: "55449-3",
            unit: "ug FEU/mL",
            issuedTimestamp: "2021-01-22T04:01:00.045-04:00",
            value: 0.4
        }),
        getSampleEntry({
            text: "D-dimmer",
            code: "55449-3",
            unit: "ug FEU/mL",
            issuedTimestamp: "2021-01-24T04:01:00.045-04:00",
            value: 0.6
        }),
        getSampleEntry({
            text: "D-dimmer",
            code: "55449-3",
            unit: "ug FEU/mL",
            issuedTimestamp: "2021-01-30T04:01:00.045-04:00",
            value: 0.2
        }),
        getSampleEntry({
            text: "C reactive protein (CRP)",
            code: "30522-7",
            unit: "mg/mL",
            issuedTimestamp: "2021-01-20T04:01:00.045-04:00",
            value: 1
        }),
        getSampleEntry({
            text: "C reactive protein (CRP)",
            code: "30522-7",
            unit: "mg/mL",
            issuedTimestamp: "2021-01-21T04:01:00.045-04:00",
            value: 2
        }),
        getSampleEntry({
            text: "C reactive protein (CRP)",
            code: "30522-7",
            unit: "mg/mL",
            issuedTimestamp: "2021-01-24T04:01:00.045-04:00",
            value: 6
        }),
        getSampleEntry({
            text: "C reactive protein (CRP)",
            code: "30522-7",
            unit: "mg/mL",
            issuedTimestamp: "2021-01-30T04:01:00.045-04:00",
            value: 4
        }),
        getSampleEntry({
            text: "Leukocytes in blood",
            code: "6690-2",
            unit: "10^9/L",
            issuedTimestamp: "2021-01-20T04:01:00.045-04:00",
            value: 20
        }),
        getSampleEntry({
            text: "Leukocytes in blood",
            code: "6690-2",
            unit: "10^9/L",
            issuedTimestamp: "2021-01-22T04:01:00.045-04:00",
            value: 18
        }),
        getSampleEntry({
            text: "Leukocytes in blood",
            code: "6690-2",
            unit: "10^9/L",
            issuedTimestamp: "2021-01-24T04:01:00.045-04:00",
            value: 10
        }),
        getSampleEntry({
            text: "Leukocytes in blood",
            code: "6690-2",
            unit: "10^9/L",
            issuedTimestamp: "2021-01-30T04:01:00.045-04:00",
            value: 8
        }),

    ]
    mockData.forEach(entry => entries.push(entry))
    return entries
}

//6690-2 10^9/L

const getSampleEntry = ({text, code, unit, issuedTimestamp, value}) => {
    return {
        "fullUrl": "https://launch.smarthealthit.org/v/r3/fhir/Observation/f99a493c-06b3-46a7-a41b-5b58d56b54f3",
        "resource": {
            "resourceType": "Observation",
            "id": "f99a493c-06b3-46a7-a41b-5b58d56b54f3",
            "meta": {
                "versionId": "3",
                "lastUpdated": "2021-04-13T03:01:00.045-04:00",
                "profile": [
                    "http://standardhealthrecord.org/fhir/StructureDefinition/shr-observation-Observation",
                    "http://standardhealthrecord.org/fhir/StructureDefinition/shr-vital-VitalSign",
                    "http://standardhealthrecord.org/fhir/StructureDefinition/shr-vital-BodyMassIndex"
                ],
                "tag": [
                    {
                        "system": "https://smarthealthit.org/tags",
                        "code": "synthea-7-2017"
                    }
                ]
            },
            "status": "final",
            "category": [
                {
                    "coding": [
                        {
                            "system": "http://hl7.org/fhir/observation-category",
                            "code": "vital-signs"
                        }
                    ]
                }
            ],
            "code": {
                "coding": [
                    {
                        "system": "http://loinc.org",
                        "code": code,
                        "display": text
                    }
                ],
                "text": text
            },
            "subject": {
                "reference": "Patient/f0462936-eb4b-4da1-b45a-fbd96ebf8ccb"
            },
            "context": {
                "reference": "Encounter/9e9ea8d6-76fb-480b-8472-1f72828f77b9"
            },
            "effectiveDateTime": issuedTimestamp,
            "issued": issuedTimestamp,
            "valueQuantity": {
                "value": value,
                "unit": unit,
                "system": "http://unitsofmeasure.org/",
                "code": unit
            }
        },
        "search": {
            "mode": "match"
        }
    }
}