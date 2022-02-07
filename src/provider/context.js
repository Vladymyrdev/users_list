import { createContext, useContext } from 'react';
import { initialState } from './reducer';

const initialValues = {
	state: initialState,
	dispatch: () => {},
};

export const UsersContext = createContext(initialValues);

export const useUsersContext = () => useContext(UsersContext);
