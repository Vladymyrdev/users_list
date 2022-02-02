import React from 'react';

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { sampleProducts } from '../products';

export const Datagrid = () => {
	const [data, setData] = React.useState(sampleProducts);
	const [editID, setEditID] = React.useState(null);

	const rowClick = (event) => {
		setEditID(event.dataItem.ProductID);
		console.log(event.dataItem.ProductID);
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
			onRowClick={rowClick}
		>
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
