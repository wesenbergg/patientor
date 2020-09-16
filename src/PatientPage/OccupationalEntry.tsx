import React from 'react';
import { Icon } from 'semantic-ui-react';
// import { Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalEntry = (props: { entry: OccupationalHealthcareEntry }) => {
  const entry = props.entry;
  
  return(
    <div className="entry-card">
      <h3>
        {entry.date}
        <Icon size="big" name="treatment" />
      </h3>
      <p><i>employer: {entry.employerName}</i></p>
      <p>{entry.description}</p>
    </div>
  );
};

export default OccupationalEntry;