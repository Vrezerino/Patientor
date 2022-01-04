import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Container, Table, Icon, Button } from "semantic-ui-react";
import { Patient } from "../types";
import { useStateValue, addPatient } from "../state";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PatientDetails = ({ patients, id }:
	{
		patients: { [id: string]: Patient; },
		id: string
	}) => {
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const [, dispatch] = useStateValue();
	const patient = Object.values(patients).find((p: Patient) => p.id === id);

	const submitNewEntry = async (values: Record<string, unknown>) => {
		try {
			const { data: modifiedPatient } = await axios.post<Patient>(
				`${apiBaseUrl}/patients/${id}/entries`,
				values
			);
			dispatch({ type: "UPDATE_PATIENT", payload: modifiedPatient });
			closeModal();
		} catch (e) {
			console.error(e.response?.data || 'Unknown Error');
			setError(e.response?.data?.error || 'Unknown error');
		}
	};

	React.useEffect(() => {
		if (!patient) {
			const fetchPatient = async () => {
				try {
					const { data: patientFromAPI } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
					dispatch(addPatient(patientFromAPI));
				} catch (e) {
					console.error(e);
				}
			};
			void fetchPatient();
		}
	}, []);

	const genderIcon = () => {
		switch (patient?.gender) {
			case "male":
				return <Icon name='mars' />;
			case "female":
				return <Icon name='venus' />;
			default:
				return <Icon name='genderless' />;
		}
	};

	return patient ? (
		<>
			<Container textAlign="center">
				<h3>{patient?.name} {genderIcon()}</h3>
			</Container>

			<Table celled>
				<Table.Body>
					<Table.Row>
						<Table.Cell>
							<b>ID:</b>
						</Table.Cell>
						<Table.Cell>
							{patient?.id}
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<b>D.O.B:</b>
						</Table.Cell>
						<Table.Cell>
							{patient?.dateOfBirth}
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<b>SSN:</b>
						</Table.Cell>
						<Table.Cell>
							{patient?.ssn}
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<b>Occupation:</b>
						</Table.Cell>
						<Table.Cell>
							{patient?.occupation}
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>

			<Container textAlign="center">
				<h4>Entries</h4>
			</Container>

			{patient.entries?.map((e) =>
				<EntryDetails key={e.id} entry={e} />
			)}

			<AddEntryModal
				modalOpen={modalOpen}
				onClose={closeModal}
				onSubmit={submitNewEntry}
				error={error}
			/>
			<Button onClick={() => openModal()}>Add New Entry</Button>
		</>
	) : <div>Patient with that ID does not exist.</div>;
};

export default PatientDetails;