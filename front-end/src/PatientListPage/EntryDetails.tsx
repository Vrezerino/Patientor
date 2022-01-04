import React from "react";
import { useStateValue } from "../state";
import { Entry, assertNever } from "../types";
import { Icon, Segment } from "semantic-ui-react";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
	const [{ diagnoses }] = useStateValue();
	const getDiagnosisName = (diagnosisCode: string): string => (
		diagnoses[diagnosisCode]?.name
	);

	const getEntryTypeIcon = () => {
		switch (entry.type) {
			case "HealthCheck":
				return <Icon name='user doctor' />;
			case "Hospital":
				return <Icon name='hospital symbol' />;
			case "OccupationalHealthcare":
				return <Icon name='stethoscope' />;
			default:
				return assertNever(entry);
		}
	};

	const getHealthRating = () => {
		if (entry.type === 'HealthCheck') {
			switch (entry.healthCheckRating) {
				case 0:
					return <><br /><Icon name='heart' color='green' /></>;
				case 1:
					return <><br /><Icon name='heart' color='yellow' /></>;
				case 2:
					return <><br /><Icon name='heart' color='orange' /></>;
				case 3:
					return <><br /><Icon name='heart' color='red' /></>;
			}
		}
	};

	return (
		<Segment key={entry.id}>
			<h3>{entry.date || null} {getEntryTypeIcon()}</h3>
			<small>{entry.description}</small>

			{entry.diagnosisCodes && <br />}

			{entry.diagnosisCodes?.map(dc =>
				<li key={dc}><b>{dc}</b> {getDiagnosisName(dc)}</li>
			)}

			{entry.type === 'OccupationalHealthcare' && entry.sickLeave &&
				<>
				<h4>Sick leave</h4>
					Start date: <i>{entry.sickLeave?.startDate}</i><br />
					End date: <i>{entry.sickLeave?.endDate}</i>
				</>
			}

			{getHealthRating()}
		</Segment>
	);
};

export default EntryDetails;