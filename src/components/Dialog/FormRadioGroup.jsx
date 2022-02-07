import React, { useRef } from 'react';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { RadioGroup } from '@progress/kendo-react-inputs';

export const FormRadioGroup = (fieldRenderProps) => {
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
