import axios from 'axios';

export class ApiService {
	static getUsers = async (api) => {
		const { data } = await axios.get(api);
		return data;
	};
}
