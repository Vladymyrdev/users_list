import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

export const UserCard = ({ data }) => {
	const [userData, setUserData] = React.useState(data);
	const [editID, setEditID] = React.useState(null);

	const rowClick = (event) => {
		setEditID(event.dataItem.ProductID);
	};

	const itemChange = (event) => {
		const inEditID = event.dataItem.ProductID;
		const field = event.field || '';
		const newData = data.map((item) =>
			item.ProductID === inEditID ? { ...item, [field]: event.value } : item
		);
		setUserData(newData);
	};

	return (
		<Grid
			data={userData.map((item) => ({
				...item,
				inEdit: item.ProductID === editID,
			}))}
			editField="inEdit"
			onRowClick={rowClick}
			onItemChange={itemChange}
		>
			<Column field="UserName" title="User Name" />
			<Column field="FullName" title="Full Name" />
			<Column field="Enabled" title="Enabled" editor="boolean" />
		</Grid>
	);
};
