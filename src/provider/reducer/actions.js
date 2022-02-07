import { SET_LOADING, GET_USERS, SET_USER_ID, GET_USER_BY_ID } from './types';

export const setUsers = (users) => ({
	type: GET_USERS,
	payload: users,
});

export const setLoading = (payload) => ({
	type: SET_LOADING,
	payload,
});

export const setUserID = (id) => ({
	type: SET_USER_ID,
	payload: id,
});

export const getUser = (user) => ({
	type: GET_USER_BY_ID,
	payload: user,
});
