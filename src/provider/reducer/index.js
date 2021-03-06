import {
	SET_LOADING,
	GET_USERS,
	SET_USER_ID,
	GET_USER_BY_ID,
	EDIT_USER,
} from './types';

export const initialState = {
	isLoading: true,
	users: [],
	userID: null,
	userDetail: [],
};

export const rootReducer = (state, action) => {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
				isLoading: true,
			};
		case SET_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case SET_USER_ID:
			return {
				...state,
				userID: action.payload,
			};
		case GET_USER_BY_ID:
			return {
				...state,
				userDetail: action.payload,
				isLoading: true,
			};
		case EDIT_USER:
			const editingUser = state.users.map((user) =>
				user.id === action.payload.id
					? [...state.users, { [action.payload.id]: action.payload }]
					: user
			);
			return {
				...state,
				users: editingUser,
			};

		default:
			return state;
	}
};
