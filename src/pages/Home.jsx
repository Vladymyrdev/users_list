import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Datagrid } from '../components/Datagrid';
import { Loader } from '../components/Loader';
import { App } from '../components/App';

import { ApiService } from '../services/apiService';
import { useUsersContext } from '../provider/context';

export const Home = () => {
	const history = useHistory();
	const { state, dispatch } = useUsersContext();

	const rowClick = (event) => {
		const userId = event.dataItem.id;
		ApiService.setId(dispatch, userId);
		history.replace(`/user_detail/id${userId}`);
	};

	const dataCell = (props) => {
		const value = props.dataItem[props.field];
		const formattingDate = new Date(value).toLocaleDateString('en-US');
		return <td style={{ textAlign: 'center' }}>{formattingDate}</td>;
	};

	useEffect(() => {
		const fetchTimeout = setTimeout(() => {
			ApiService.getUsersData(dispatch);
		}, 1000);

		return () => {
			clearTimeout(fetchTimeout);
		};
	}, [dispatch]);

	return (
		<div>
			<App>
				{state?.isLoading ? (
					<Loader />
				) : (
					<Datagrid
						data={state?.users}
						rowClick={rowClick}
						dataCell={dataCell}
					/>
				)}
			</App>
		</div>
	);
};
