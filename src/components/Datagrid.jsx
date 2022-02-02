import React from 'react';

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

export const Datagrid = ({ data, rowClick, editID, enabledCell }) => {
	return (
		<div className="content">
			<Grid
				data={data.map((item) => ({
					...item,
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
				<Column
					cell={enabledCell}
					field="Enabled"
					title="Enabled"
					editor="boolean"
				/>
			</Grid>
		</div>
	);
};
