import React, { useState } from 'react';
import { Window } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';

import { ApiService } from '../../services/apiService';
import { fullNameValidator, userNameValidator } from './validation';
import { useUsersContext } from '../../provider/context';
import { FormRadioGroup } from './FormRadioGroup';
import { FieldInput } from './FieldInput';
import { variantsForEnabled } from './constants';

export const Dialog = () => {
	const [visible, setVisible] = useState(false);
	const { state } = useUsersContext();

	const toggleDialog = () => {
		setVisible((prev) => !prev);
	};

	const handleSubmit = (dataItem) => {
		const invalidDataItem = Object.values(dataItem).some((item) => item === '');
		if (invalidDataItem) {
			return;
		}
		const notUniqUser = state.users.some(
			(user) => user?.UserName === dataItem?.userName
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
		ApiService.setUser(newUser);
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
				<Window title="Add new user" onClose={toggleDialog} initialHeight={400}>
					<Form
						onSubmit={handleSubmit}
						render={(formRenderProps) => (
							<FormElement
								style={{
									maxWidth: 650,
								}}
							>
								<fieldset className="k-form-fieldset">
									<legend className="k-form-legend">
										Please fill all field:
									</legend>
									<div className="mb-3">
										<Field
											name="userName"
											type="name"
											component={FieldInput}
											label="User Name"
											valid={false}
											validator={userNameValidator}
										/>
									</div>
									<div className="mb-3">
										<Field
											name="fullName"
											type="name"
											component={FieldInput}
											label="First Name & Last Name"
											validator={fullNameValidator}
										/>
									</div>
									<div className="mb-3">
										<Field
											key="enabled"
											id="enabled"
											name="enabled"
											label="Enabled"
											layout="horizontal"
											component={FormRadioGroup}
											data={variantsForEnabled}
										/>
									</div>
								</fieldset>
								<div className="k-form-buttons">
									<button
										type="submit"
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
