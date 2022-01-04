import { Diagnosis } from "../types";
import ds from '../data/diagnoses.json';
const diagnoses: Array<Diagnosis> = ds as Array<Diagnosis>;

const getDiagnoses = (): Array<Diagnosis> => {
	return diagnoses;
};

export default {
	getDiagnoses
};