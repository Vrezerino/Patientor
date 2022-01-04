import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
	res.send(patientService.getOnePatient(req.params.id));
});

router.post('/', (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.error(e.message);
			res.status(400).send(e.message);
		}
	}
});

router.post('/:id/entries', (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const modifiedPatient = patientService.addEntry(req.params.id, req.body);
		res.json(modifiedPatient);
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.error(e.message);
			res.status(400).send(e.message);
		}
	}
});

router.post('/', (_req, res) => {
  res.send('');
});

export default router;