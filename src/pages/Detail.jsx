import React, { useEffect } from 'react';
import { UserCard } from '../components/UserCard';
import { Loader } from '../components/Loader';
import { useUsersContext } from '../provider/context';
import { GET_USERS_API } from '../api/constants';
import { ApiService } from '../services/apiService';

export const Detail = () => {
	const {
		state: { userID, userDetail, isLoading },
		dispatch,
	} = useUsersContext();

	useEffect(() => {
		ApiService.getUserByID(dispatch, GET_USERS_API, userID);
	}, [dispatch, userID]);

	return (
		<div className="detail">
			{userDetail.map((item) => (
				<h1 key={item.id}>The card of user {item.FullName}</h1>
			))}
			{isLoading ? <Loader /> : <UserCard data={userDetail} />}
		</div>
	);
};
