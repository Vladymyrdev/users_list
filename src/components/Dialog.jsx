import React, { useState } from 'react';
import { Window } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { getter } from '@progress/kendo-react-common';

const firstNameGetter = getter('user.firstName');
const lastNameGetter = getter('user.lastName');
const userNameGetter = getter('user.userName');
const enabledGetter = getter('user.enabled');

const regexpUserNAme = /^[a-z0-9_-]{3,15}$/i;

const formValidator = (values) => {
	if (
		firstNameGetter(values) ||
		lastNameGetter(values) ||
		userNameGetter(values) ||
		enabledGetter(values)
	) {
		return;
	}

	return {
		VALIDATION_SUMMARY: 'Please fill all following fields',
		['user.userName']:
			'Please check the validation summary for more information.',
		['user.lastName']:
			'Please check the validation summary for more information.',
		['user.firstName']:
			'Please check the validation summary for more information.',
		['user.enabled']: "Please enter 'Yes' or 'No' in this field.",
	};
};

const ValidatedInput = (fieldRenderProps) => {
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

	const handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));

	const toggleDialog = () => {
		setVisible(!visible);
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
						validator={formValidator}
						render={(formRenderProps) => (
							<FormElement
								style={{
									maxWidth: 650,
								}}
							>
								<fieldset className={'k-form-fieldset'}>
									<legend className={'k-form-legend'}>
										Please fill in the following information:
									</legend>
									{formRenderProps.visited &&
										formRenderProps.errors &&
										formRenderProps.errors.VALIDATION_SUMMARY && (
											<div className={'k-messagebox k-messagebox-error'}>
												{formRenderProps.errors.VALIDATION_SUMMARY}
											</div>
										)}
									<div className="mb-3">
										<Field
											name={'user.userName'}
											component={ValidatedInput}
											label={'User name'}
										/>
									</div>
									<div className="mb-3">
										<Field
											name={'user.firstName'}
											component={ValidatedInput}
											label={'First name'}
										/>
									</div>
									<div className="mb-3">
										<Field
											name={'user.lastName'}
											component={ValidatedInput}
											label={'Last name'}
										/>
									</div>
									<div className="mb-3">
										<Field
											name={'user.enabled'}
											component={ValidatedInput}
											label={'Enabled'}
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
