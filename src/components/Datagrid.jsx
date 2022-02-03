import React, { useState } from 'react';

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { ColumnMenu } from './columnMenu';
import { MyCustomCell } from './CustomCell';
import { Dialog } from './Dialog';

export const Datagrid = ({ data, rowClick, dataCell }) => {
	const createDataState = (dataState) => {
		return {
			result: process(data.slice(0), dataState),
			dataState: dataState,
		};
	};

	let initialState = createDataState({
		take: 8,
		skip: 0,
	});

	const [result, setResult] = useState(initialState.result);
	const [dataState, setDataState] = useState(initialState.dataState);

	const dataStateChange = (event) => {
		let updatedState = createDataState(event.dataState);
		setResult(updatedState.result);
		setDataState(updatedState.dataState);
	};

	return (
		<div className="content">
			<Grid
				data={result}
				{...dataState}
				onDataStateChange={dataStateChange}
				sortable={true}
				pageable={true}
				pageSize={8}
				onRowClick={rowClick}
			>
				<Column field="ProductID" title="Id" width="40px" editable={false} />
				<Column field="UserName" title="User name" columnMenu={ColumnMenu} />
				<Column field="FullName" title="Full name" />
				<Column
					field="LastLogin"
					title="Last Login"
					editor="date"
					cell={dataCell}
				/>
				<Column
					cell={MyCustomCell}
					field="Enabled"
					title="Enabled"
					editor="boolean"
				/>
			</Grid>
			<Dialog />
		</div>
	);
};
