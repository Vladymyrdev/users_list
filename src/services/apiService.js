import axios from 'axios';
import {
	setLoading,
	setUserID,
	setUsers,
	getUser,
} from '../provider/reducer/actions';

export class ApiService {
	static getUsersData = async (dispatch, api) => {
		await axios.get(api).then(({ data }) => dispatch(setUsers(data.users)));
		dispatch(setLoading(false));
	};

	static setId = (dispatch, id) => {
		dispatch(setUserID(id));
	};

	static getUserByID = async (dispatch, api, state) => {
		await axios.get(api).then(({ data }) => {
			const fileredUser = data.users.filter((user) => user.id === state.userID);
			dispatch(getUser(fileredUser));
		});
		dispatch(setLoading(false));
	};

	static setUser = (api, user) => {
		axios.post(api, user).catch((err) => {
			console.log('Error saving user', err);
		});
	};
}
