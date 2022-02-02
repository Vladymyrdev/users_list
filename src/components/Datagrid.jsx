import React from 'react';

import {
	Grid,
	GridColumn as Column,
	GridToolbar,
} from '@progress/kendo-react-grid';
import { sampleProducts } from '../products';

export const Datagrid = () => {
	const [data, setData] = React.useState(sampleProducts);
	const [editID, setEditID] = React.useState(null);

	const rowClick = (event) => {
		setEditID(event.dataItem.ProductID);
		console.log(event.dataItem.ProductID);
	};

	const itemChange = (event) => {
		const inEditID = event.dataItem.ProductID;
		const field = event.field || '';
		const newData = data.map((item) =>
			item.ProductID === inEditID ? { ...item, [field]: event.value } : item
		);
		setData(newData);
	};

	const closeEdit = (event) => {
		if (event.target === event.currentTarget) {
			setEditID(null);
		}
	};

	return (
		<Grid
			style={{
				height: '420px',
			}}
			data={data.map((item) => ({
				...item,
				inEdit: item.ProductID === editID,
			}))}
			editField="inEdit"
			onRowClick={rowClick}
			onItemChange={itemChange}
		>
			<GridToolbar>
				<div onClick={closeEdit}></div>
			</GridToolbar>
			<Column field="ProductID" title="Id" width="50px" editable={false} />
			<Column field="UserName" title="User name" />
			<Column
				field="FullName"
				title="Full name"
				width="150px"
				editor="numeric"
			/>
			<Column
				field="LastLogin"
				title="Last Login"
				editor="date"
				format="{0:d}"
			/>
			<Column field="Enabled" title="Enabled" editor="boolean" />
		</Grid>
	);
};
