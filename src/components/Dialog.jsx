import React, { useState, useRef } from 'react';
import { Window } from '@progress/kendo-react-dialogs';
import {
	Form,
	Field,
	FormElement,
	FieldWrapper,
} from '@progress/kendo-react-form';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { Input, RadioGroup } from '@progress/kendo-react-inputs';
import axios from 'axios';

const variantsForEnabled = [
	{
		label: 'Yes',
		value: true,
	},
	{
		label: 'No',
		value: false,
	},
];

const FormRadioGroup = (fieldRenderProps) => {
	const {
		validationMessage,
		touched,
		id,
		label,
		valid,
		disabled,
		hint,
		visited,
		modified,
		...others
	} = fieldRenderProps;
	const editorRef = useRef(null);
	const showValidationMessage = touched && validationMessage;
	const showHint = !showValidationMessage && hint;
	const hintId = showHint ? `${id}_hint` : '';
	const errorId = showValidationMessage ? `${id}_error` : '';
	const labelId = label ? `${id}_label` : '';
	return (
		<FieldWrapper>
			<Label
				id={labelId}
				editorRef={editorRef}
				editorId={id}
				editorValid={valid}
				editorDisabled={disabled}
			>
				{label}
			</Label>
			<RadioGroup
				ariaDescribedBy={`${hintId} ${errorId}`}
				ariaLabelledBy={labelId}
				valid={valid}
				disabled={disabled}
				ref={editorRef}
				{...others}
			/>
			{showHint && <Hint id={hintId}>{hint}</Hint>}
			{showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
		</FieldWrapper>
	);
};

const userNameRegex = new RegExp(/^[a-z0-9]{2,15}$/i);
const fullNameRegex = new RegExp(
	/(^[A-Z]{1}[a-z]{1,24}\s[A-Z]{1}[a-z]{1,24}$){1,40}/
);

const userNameValidator = (value) =>
	userNameRegex.test(value)
		? ''
		: 'Please enter max. 15 characters, only alphanumeric characters, non-empty';

const fullNameValidator = (value) =>
	fullNameRegex.test(value)
		? ''
		: 'Please enter together max. 40 characters, first letter capital, both non-empty, each has max. 25 characters';

const FieldInput = (fieldRenderProps) => {
	const { validationMessage, visited, ...others } = fieldRenderProps;
	return (
		<div>
			<Input {...others} />
			{visited && validationMessage && <Error>{validationMessage}</Error>}
		</div>
	);
};

export const Dialog = ({ setUsers }) => {
	const [visible, setVisible] = useState(false);

	const toggleDialog = () => {
		setVisible(!visible);
	};

	const handleSubmit = (dataItem) => {
		const newUser = {
			id: Math.random().toString(16).slice(2),
			UserName: dataItem.userName,
			FullName: dataItem.fullName,
			Enabled: dataItem.enabled,
			LastLogin: new Date(),
		};

		axios
			.post('http://localhost:3001/users', newUser)
			.then(({ data }) => {
				setUsers(data.users);
			})
			.catch(() => {
				console.log('Error saving user');
			});
	};

	return (
		<div className="dialog">
			<button
				className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
				onClick={toggleDialog}
			>
				NEW USER
			</button>
			{visible && (
				<Window
					title={'Add new user'}
					onClose={toggleDialog}
					initialHeight={450}
				>
					<Form
						onSubmit={handleSubmit}
						render={(formRenderProps) => (
							<FormElement
								style={{
									maxWidth: 650,
								}}
							>
								<fieldset className={'k-form-fieldset'}>
									<legend className={'k-form-legend'}>
										Please fill all field:
									</legend>
									<div className="mb-3">
										<Field
											name={'userName'}
											type={'name'}
											component={FieldInput}
											label={'User Name'}
											validator={userNameValidator}
										/>
									</div>
									<div className="mb-3">
										<Field
											name={'fullName'}
											type={'name'}
											component={FieldInput}
											label={'First Name, Last Name'}
											validator={fullNameValidator}
										/>
									</div>
									<div className="mb-3">
										<Field
											key={'enabled'}
											id={'enabled'}
											name={'enabled'}
											label={'Enabled'}
											layout={'horizontal'}
											component={FormRadioGroup}
											data={variantsForEnabled}
										/>
									</div>
								</fieldset>
								<div className="k-form-buttons">
									<button
										type={'submit'}
										className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
										disabled={!formRenderProps.allowSubmit}
									>
										Submit
									</button>
								</div>
							</FormElement>
						)}
					/>
				</Window>
			)}
		</div>
	);
};
