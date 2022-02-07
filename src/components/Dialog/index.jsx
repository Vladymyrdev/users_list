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

import { ApiService } from '../../services/apiService';
import { SET_USER_API } from '../../api/constants';
import { fullNameValidator, userNameValidator } from './validation';
import { useUsersContext } from '../../provider/context';

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

const FieldInput = (fieldRenderProps) => {
	const { validationMessage, visited, ...others } = fieldRenderProps;
	return (
		<div>
			<Input {...others} />
			{visited && validationMessage && <Error>{validationMessage}</Error>}
		</div>
	);
};

export const Dialog = () => {
	const [visible, setVisible] = useState(false);
	const { state } = useUsersContext();

	const toggleDialog = () => {
		setVisible(!visible);
	};

	const handleSubmit = (dataItem) => {
		const invalidDataItem = Object.values(dataItem).some((item) => item === '');
		if (invalidDataItem) return;
		const notUniqUser = state.users.some(
			(user) =>
				user?.UserName.toUpperCase() === dataItem?.userName.toUpperCase()
		);
		if (notUniqUser)
			return alert(
				'User with the same name already exists. Please enter another user name'
			);
		const newUser = {
			id: Math.random().toString(16).slice(2),
			UserName: dataItem.userName,
			FullName: dataItem.fullName,
			Enabled: dataItem.enabled,
			LastLogin: new Date(),
		};
		ApiService.setUser(SET_USER_API, newUser);
		setVisible(false);
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
					initialHeight={400}
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
											valid={false}
											validator={userNameValidator}
										/>
									</div>
									<div className="mb-3">
										<Field
											name={'fullName'}
											type={'name'}
											component={FieldInput}
											label={'First Name & Last Name'}
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
