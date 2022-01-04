import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField, SelectField, EntryOption, NumberField, DiagnosisSelection } from "./FormField";

const entryOptions: EntryOption[] = [
	{ value: 'HealthCheck', label: 'Health Check' },
	{ value: 'Hospital', label: 'Hospital' },
	{ value: 'OccupationalHealthcare', label: 'Occupational Healthcare' }
];

interface AddEntryFormProps {
	onSubmit: (values: Record<string, unknown>) => void;
	onCancel: () => void;
}



export const AddEntryForm = ({ onSubmit, onCancel }: AddEntryFormProps) => {
	const [{ diagnoses }] = useStateValue();
	return (
		<Formik
			initialValues={{
				date: '',
				type: 'HealthCheck',
				specialist: '',
				employerName: '',
				diagnosisCodes: [''],
				description: '',
				healthCheckRating: 0,
				sickLeave: { startDate: '', endDate: '' },
				discharge: { date: '', criteria: '' }
			}}
			onSubmit={onSubmit}
			validate={values => {
				const requiredError = 'Field is required';
				const errors: { [field: string]: string } = {};
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.type) {
					errors.type = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				return errors;
			}}
		>
			{({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
				return (
					<Form className='form ui'>
						<Field
							label='Date'
							placeholder='YYYY-MM-DD'
							name='date'
							component={TextField}
						/>
						<SelectField
							label='Entry type'
							name='type'
							options={entryOptions}
						/>
						<Field
							label='Description'
							placeholder='Description'
							name='description'
							component={TextField}
						/>
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnoses)}
						/>
						<Field
							label='Specialist'
							placeholder='Specialist'
							name='specialist'
							component={TextField}
						/>
						{values.type === 'OccupationalHealthcare' &&
							<Field
								label='Employer name'
								placeholder='Employer name'
								name="employerName"
								component={TextField}
							/>}
						{values.type === 'OccupationalHealthcare' &&
							<>
								<Field
									label='Sick leave start date'
									placeholder='YYYY-MM-DD'
									name='sickLeave.startDate'
									component={TextField}
								/>
								<Field
									label='Sick leave end date'
									placeholder='YYYY-MM-DD'
									name='sickLeave.endDate'
									component={TextField}
								/>
							</>}
						{values.type === 'Hospital' &&
							<Field
								label='Discharge'
								placeholder='Discharge'
								name='occupation'
								component={TextField}
							/>}
						{values.type === 'HealthCheck' &&
							<Field
								label="Health Check Rating (0 = healthy, 1 = low risk, 2 = high risk, 3 = critical risk)"
								name="healthCheckRating"
								component={NumberField}
								min={0}
								max={3}
							/>
						}

						<Grid>
							<Grid.Column floated='left' width={5}>
								<Button type='button' onClick={onCancel} color='red'>
									Cancel
								</Button>
							</Grid.Column>
							<Grid.Column floated='right' width={5}>
								<Button
									type='submit'
									floated='right'
									color='green'
									disabled={!dirty || !isValid}
								>
									Add
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;
