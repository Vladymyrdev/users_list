import React, { useEffect } from 'react';
import { Loader } from '../components/Loader';
import { useUsersContext } from '../provider/context';
import { ApiService } from '../services/apiService';
import { UserDetail } from '../components/UserDetail.jsx';

export const Detail = () => {
	const {
		state: { userID, userDetail, isLoading },
		dispatch,
	} = useUsersContext();

	useEffect(() => {
		ApiService.getUserByID(dispatch, userID);
	}, [dispatch, userID]);

	return (
		<div className="detail">
			{userDetail.map((item) => (
				<h1 key={item.id}>The card of user {item.FullName}</h1>
			))}
			{isLoading ? <Loader /> : <UserDetail userData={userDetail} />}
		</div>
	);
};
