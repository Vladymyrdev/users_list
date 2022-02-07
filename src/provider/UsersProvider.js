import { useReducer } from 'react';
import { initialState, rootReducer } from './reducer';
import { UsersContext } from './context';

export const UsersProvider = ({ children }) => {
	const [state, dispatch] = useReducer(rootReducer, initialState);

	const usersValues = {
		state,
		dispatch,
	};

	return (
		<UsersContext.Provider value={usersValues}>
			{children}
		</UsersContext.Provider>
	);
};
