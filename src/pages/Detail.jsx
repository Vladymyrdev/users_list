import React, { useEffect } from 'react';
import { UserCard } from '../components/UserCard';
import { Loader } from '../components/Loader';
import { useUsersContext } from '../provider/context';
import { GET_USERS_API } from '../api/constants';
import { ApiService } from '../services/apiService';

export const Detail = () => {
	const { state, dispatch } = useUsersContext();

	useEffect(() => {
		ApiService.getUserByID(dispatch, GET_USERS_API, state);
	}, [state?.userID]);

	return (
		<div className="detail">
			{state?.userDetail.map((item) => (
				<h1 key={item.id}>The card of user {item.FullName}</h1>
			))}
			{state?.isLoading ? <Loader /> : <UserCard data={state?.userDetail} />}
		</div>
	);
};
