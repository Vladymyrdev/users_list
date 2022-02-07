const userNameRegex = new RegExp(/^[A-Z]{1}[a-z]{1,24}$/i);
const fullNameRegex = new RegExp(
	/(^[A-Z]{1}[a-z]{1,24}\s[A-Z]{1}[a-z]{1,24}$){1,40}/
);

export const fullNameValidator = (values) =>
	!values
		? 'Please enter together max. 40 characters, first letter capital, both non-empty, each has max. 25 characters'
		: fullNameRegex.test(values)
		? ''
		: 'Field is not valid format';

export const userNameValidator = (value) =>
	!value
		? 'Please enter max. 15 characters, only alphanumeric characters, non-empty'
		: userNameRegex.test(value)
		? ''
		: 'Field is not valid format';
