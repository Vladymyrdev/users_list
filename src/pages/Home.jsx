import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Datagrid } from '../components/Datagrid';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { useHistory } from 'react-router-dom';

export const Home = () => {
	const [usersData, setUsersData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [editID, setEditID] = useState(null);
	const history = useHistory();

	const rowClick = (event) => {
		const userId = event.dataItem.ProductID;
		setEditID(userId);
		history.replace(`/user/id${userId}`);
	};

	const enabledCell = (props) => {
		return <td>{props.dataItem[props.field] ? 'Yes' : 'No'}</td>;
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
			<Header />
			{isLoading ? (
				<Loader />
			) : (
				<Datagrid
					data={usersData}
					editID={editID}
					rowClick={rowClick}
					enabledCell={enabledCell}
				/>
			)}
		</div>
	);
};
