import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Datagrid } from '../components/Datagrid';
import { Loader } from '../components/Loader';
import { App } from '../components/App';

export const Home = () => {
	const [usersData, setUsersData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [editID, setEditID] = useState(null);
	const history = useHistory();

	const rowClick = (event) => {
		const userId = event.dataItem.ProductID;
		setEditID(userId);
		history.replace(`/user_detail/id${userId}`);
	};

	const dataCell = (props) => {
		const value = props.dataItem[props.field];
		const formattingDate = new Date(value).toLocaleDateString('en-US');
		return <td style={{ textAlign: 'center' }}>{formattingDate}</td>;
	};

	useEffect(() => {
		try {
			setIsLoading(true);
			setTimeout(() => {
				axios.get('http://localhost:3001/db.json').then(({ data }) => {
					setUsersData(data.users);
					setIsLoading(false);
				});
			}, 1500);
		} catch (error) {
			console.log('Error fetch data', error);
		}
	}, []);

	return (
		<div>
			<App>
				{isLoading ? (
					<Loader />
				) : (
					<Datagrid data={usersData} rowClick={rowClick} dataCell={dataCell} />
				)}
			</App>
		</div>
	);
};
