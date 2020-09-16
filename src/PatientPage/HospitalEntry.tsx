import React from 'react';
import { useStateValue } from '../state';
import { HospitalEntry } from '../types';

const HospitalEntryCard = (props: { entry: HospitalEntry }) => {
  const entry = props.entry;
  const [{ diagnosis },] = useStateValue();

  const showDiagnosisName = (code: string): string => {
    const foundDiagnosis = diagnosis.find(d => d.code === code );
    return foundDiagnosis ? foundDiagnosis.name: '';
  };

  return(
    <div key={entry.id} className="entry-card">
      <p><b>{entry.date} </b>
      {entry.description}</p>
      {entry.diagnosisCodes ? 
        <ul>
          {entry.diagnosisCodes.map(e =>
            <li key={e}>
              {e} - {showDiagnosisName(e)}
            </li>
          )}
        </ul>: ''}
    </div>
  );
};

export default HospitalEntryCard;