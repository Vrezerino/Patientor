/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Patient, NewPatient, Entry } from "../types";
import ps from '../data/patients';
let patients: Array<Patient> = ps;
import { v4 as uuid } from 'uuid';

/* 
	SSNs and entrylists are visible anyway on individual patient pages, 
	modified down the lane to return Patients as opposed to PublicPatients .
*/
const getPatients = (): Patient[] => {
	return patients;
};

const getOnePatient = (id: string): Patient => {
	return patients.find(p => p.id === id) as Patient;
};

const addPatient = (patient: NewPatient): Patient => {
	const newPatient = {
		id: String(uuid()),
		...patient
	};
	patients.push(newPatient);
	return newPatient;
};

const addEntry = (id: string, entry: Entry): Patient => {
	let newEntry;

	/* Exclude fields except specified ones;
	 * AddEntryForm on the frontend sends all possible properties and their values
	*/
	switch (entry.type) {
		case "HealthCheck":
			newEntry = (({ date, type, specialist, description, healthCheckRating, diagnosisCodes }) =>
				({ date, type, specialist, description, healthCheckRating, diagnosisCodes }))(entry);
			break;
		case "OccupationalHealthcare":
			newEntry = (({ date, type, specialist, description, employerName, diagnosisCodes, sickLeave }) =>
				({ date, type, specialist, description, employerName, diagnosisCodes, sickLeave }))(entry);
			break;
		case 'Hospital':
			newEntry = (({ date, type, specialist, description, diagnosisCodes, discharge }) =>
				({ date, type, specialist, description, diagnosisCodes, discharge }))(entry);
				break;
		default:
			throw new Error('possible incorrect entry type');
	}

	newEntry = { ...newEntry, id: String(uuid()) };

	const patient = patients.find(p => p.id === id);
	patient?.entries.push(newEntry);
	patients = patients.map(p => p.id === id ? patient : p) as Patient[];
	return patient as Patient;
};

export default {
	getPatients,
	getOnePatient,
	addPatient,
	addEntry
};