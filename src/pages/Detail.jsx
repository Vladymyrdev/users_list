import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserCard } from '../components/UserCard';
import { Loader } from '../components/Loader';

export const Detail = () => {
	const [userData, setUserData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();

	const userId = history.location.pathname.slice(-1);

	useEffect(() => {
		try {
			setIsLoading(true);
			setTimeout(() => {
				axios.get('http://localhost:3001/db.json').then(({ data }) => {
					const fileredUser = data.users.filter(
						(user) => Number(user.ProductID) === Number(userId)
					);
					setUserData(fileredUser);
					setIsLoading(false);
				});
			}, 1500);
		} catch (error) {
			console.log('Error fetch data', error);
		}
	}, [userId]);
	return (
		<div className="detail">
			{userData?.map((item) => (
				<h1>The card of user {item.FullName}</h1>
			))}
			{isLoading ? <Loader /> : <UserCard data={userData} />}
		</div>
	);
};
