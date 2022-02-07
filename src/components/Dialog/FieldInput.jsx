import React from 'react';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';

export const FieldInput = (fieldRenderProps) => {
	const { validationMessage, visited, ...others } = fieldRenderProps;
	return (
		<div>
			<Input {...others} />
			{visited && validationMessage && <Error>{validationMessage}</Error>}
		</div>
	);
};
