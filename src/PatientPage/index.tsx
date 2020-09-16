import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import AddPatientModal from '../AddPatientModal';
import { useStateValue, setPatient } from '../state';
import HealthCheck from './HealthCheck';
import HospitalEntryCard from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  useEffect(() => {
    if(patient && patient.id === id) return;
    fetch(`http://localhost:3001/api/patients/${id}`)
    .then(res => res.json())
    .then(res => {
      dispatch(setPatient(res));
    });
  }, [id, dispatch, patient]);

  if(!patient) return <h1>Loading data</h1>;
  // console.log(diagnosis);
  
  const showGenderIcon = () => {
    switch (patient.gender) {
      case 'male':
        return <Icon color="blue" name="man" />;
      case 'female':
        return <Icon color="red" name="woman" />;
      case 'other':
        return <Icon color="green" name="other gender horizontal" />;
      default:
        break;
    }
  };

  const showEntries = () => patient.entries.map(e => {
    switch (e.type) {
      case 'HealthCheck':
        return <HealthCheck key={e.id} entry={e} />;
      case 'OccupationalHealthcare':
        return <OccupationalEntry key={e.id} entry={e} />;
      case 'Hospital':
        return <HospitalEntryCard key={e.id} entry={e} />;
      default:
        return assertNever(e);
    }
  });
  
  return(
    <div>
      <h1>{patient.name} {showGenderIcon()}</h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {showEntries()}
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={() => console.log('add')}
        error={undefined}
        onClose={() => setModalOpen(false)}
      />
      <Button className="mt-3" onClick={() => openModal()}>Add Entry</Button>
    </div>
  );
};

export default PatientPage;