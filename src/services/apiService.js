import axios from 'axios';
import {
	GET_USERS_API,
	SET_EDIT_USER_API,
	SET_USER_API,
} from '../api/constants';
import {
	setLoading,
	setUserID,
	setUsers,
	getUser,
	onEditUser,
} from '../provider/reducer/actions';

export class ApiService {
	static getUsersData = async (dispatch) => {
		await axios
			.get(GET_USERS_API)
			.then(({ data }) => dispatch(setUsers(data.users)));
		dispatch(setLoading(false));
	};

	static setId = (dispatch, id) => {
		dispatch(setUserID(id));
	};

	static getUserByID = async (dispatch, id) => {
		await axios.get(GET_USERS_API).then(({ data }) => {
			const fileredUser = data.users.filter((user) => user.id === id);
			dispatch(getUser(fileredUser));
		});
		dispatch(setLoading(false));
	};

	static setUser = (user) => {
		axios.post(SET_USER_API, user).catch((err) => {
			console.log('Error saving user', err);
		});
	};

	static setEditUser = async (id, newUser, dispatch) => {
		await axios
			.patch(SET_USER_API + '/' + id, newUser)
			.catch((err) => console.log('Error editing user', err));
		dispatch(onEditUser(newUser));
	};
}
