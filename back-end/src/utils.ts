import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseValue = (value: unknown): string => {
	if (!value || !isString(value)) {
		throw new Error('Incorrect or missing value');
	}
	return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error(`Incorrect or missing gender: ${gender}`);
	}
	return gender;
};

type Fields = {
	id: unknown,
	name: unknown,
	dateOfBirth: unknown,
	ssn: unknown,
	gender: unknown,
	occupation: unknown
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
	const newPatient: NewPatient = {
		name: parseValue(name),
		dateOfBirth: parseValue(dateOfBirth),
		ssn: parseValue(ssn),
		gender: parseGender(gender),
		occupation: parseValue(occupation),
		entries: []
	};
	return newPatient;
};

export default toNewPatient;