import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
    type: "INIT_DIAGNOSIS";
    payload: Array<Diagnosis>;
  }
  | {
    type: "SET_ACTIVE_PATIENT";
    payload: Patient;
  }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "ADD_ENTRY";
    payload: { 
      entry: Entry;
      id: string;
    };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT_DIAGNOSIS":
      return {
        ...state,
        diagnosis: [ ...action.payload ]
      };
    case "SET_ACTIVE_PATIENT":      
      return {
        ...state,
        patient: { ...action.payload }
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const foundPatient = state.patients[action.payload.id];
      foundPatient.entries = foundPatient.entries.concat(action.payload.entry);
      console.log(foundPatient);
            
      return {
        ...state,
        patient: {
          ...foundPatient
        },
        patients: {
          ...state.patients,
          [action.payload.id]: foundPatient
        }
      };
    default:
      return state;
  }
};

export const initDiagnosis = (diagnosisListFromApi: Array<Diagnosis>): Action => {
  return { type: "INIT_DIAGNOSIS", payload: diagnosisListFromApi };
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientListFromApi };
};

export const setPatient = (patient: Patient): Action => {
  return { type: "SET_ACTIVE_PATIENT", payload: patient } ;
};

export const addPatient = (patient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: patient } ;
};

export const addEntry = (entry: Entry, id: string): Action => {
  return { type: "ADD_ENTRY", payload: { entry, id } } ;
};