import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { HealthCheckEntry } from '../types';

const HealthCheck = (props: { entry: HealthCheckEntry }) => {
  const entry = props.entry;
  const [{ diagnosis },] = useStateValue();

  const showHealthIcon = () => {
    console.log(entry);
    console.log(entry.healthCheckRating);
    
    switch (entry.healthCheckRating) {
      case 0:
        return <>
          <Icon color="green" name="heart" />
          <Icon color="green" name="heart" />
          <Icon color="green" name="heart" />
          <Icon color="green" name="heart" />
        </>;
      case 1:
        return <>
          <Icon color="yellow" name="heart" />
          <Icon color="yellow" name="heart" />
          <Icon color="yellow" name="heart" />
          <Icon color="grey" name="heart outline" />
        </>;
      case 2:
        return <>
          <Icon color="orange" name="heart" />
          <Icon color="orange" name="heart" />
          <Icon color="grey" name="heart outline" />
          <Icon color="grey" name="heart outline" />
        </>;
      case 3:
        return <><Icon color="red" name="heart" />
        <Icon color="grey" name="heart outline" />
        <Icon color="grey" name="heart outline" />
        <Icon color="grey" name="heart outline" /></>;
      default:
        break;
    }
  };

  const showDiagnosisName = (code: string): string => {
    const foundDiagnosis = diagnosis.find(d => d.code === code );
    return foundDiagnosis ? foundDiagnosis.name: '';
  };

  return(
    <div key={entry.id} className="entry-card">
      <h3><b>{entry.date} <Icon size="big" name="doctor" /></b></h3>
      <p>{entry.description}</p>
      {showHealthIcon()}
      {entry.diagnosisCodes ? entry.diagnosisCodes.map(e =>
            <li key={e}>
              {e} - {showDiagnosisName(e)}
            </li>
          ): <></>}
    </div>
  );
};

export default HealthCheck;