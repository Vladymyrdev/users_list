import React, { useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { useHistory } from 'react-router-dom';
import { RoutesEnum } from '../routes/constants';
export const UserCard = ({ data }) => {
	const [userData, setUserData] = useState(data);
	const [editID, setEditID] = useState(null);
	const history = useHistory();

	const rowClick = (event) => {
		setEditID(event.dataItem.ProductID);
	};

	const itemChange = (event) => {
		const inEditID = event.dataItem.ProductID;
		const field = event.field || '';
		const newData = data.map((item) =>
			item.id === inEditID ? { ...item, [field]: event.value } : item
		);
		setUserData(newData);
	};

	const onHandleBackHome = () => {
		history.replace(RoutesEnum.HOME);
	};

	const renderUserData = userData.map((item) => ({
		...item,
		inEdit: item.ProductID === editID,
	}));

	return (
		<div className="user_card">
			<Grid
				data={renderUserData}
				editField="inEdit"
				onRowClick={rowClick}
				onItemChange={itemChange}
			>
				<Column field="UserName" title="User Name" />
				<Column field="FullName" title="Full Name" />
				<Column field="Enabled" title="Enabled" editor="boolean" />
			</Grid>
			<button
				className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
				onClick={onHandleBackHome}
			>
				BACK TO HOME
			</button>
		</div>
	);
};
