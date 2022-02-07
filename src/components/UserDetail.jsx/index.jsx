import React, { useState } from 'react';
import {
	Grid,
	GridColumn as Column,
	GridToolbar,
} from '@progress/kendo-react-grid';
import { useHistory } from 'react-router-dom';

import { CellRender, RowRender } from './CellRender';
import { RoutesEnum } from '../../routes/constants';
import { ApiService } from '../../services/apiService';
import { useUsersContext } from '../../provider/context';

export const UserDetail = ({ userData }) => {
	const [data, setData] = useState(userData);
	const [editField, setEditField] = useState(undefined);
	const [changes, setChanges] = useState(false);
	const history = useHistory();

	const { dispatch } = useUsersContext();

	const onHandleBackHome = () => {
		history.replace(RoutesEnum.HOME);
	};

	const enterEdit = (dataItem, field) => {
		const newData = data.map((item) => ({
			...item,
			inEdit: item.id === dataItem.id ? field : undefined,
		}));
		setData(newData);
		setEditField(field);
	};

	const exitEdit = () => {
		const newData = data.map((item) => ({ ...item, inEdit: undefined }));
		ApiService.setEditUser(
			`http://localhost:3001/users/${userData[0].id}`,
			newData[0],
			dispatch
		);
		setData(newData);
		setEditField(undefined);
	};

	const saveChanges = () => {
		userData.splice(0, userData.length, ...data);
		console.log('РЕДИРЕКТ БЛЯЯЯТЬ');
		onHandleBackHome();
		setEditField(undefined);
		setChanges(false);
	};

	const cancelChanges = () => {
		setData(userData);
		setChanges(false);
	};

	const itemChange = (event) => {
		let field = event.field || '';
		event.dataItem[field] = event.value;
		let newData = data.map((item) => {
			if (item.ProductID === event.dataItem.ProductID) {
				item[field] = event.value;
			}

			return item;
		});
		setData(newData);
		setChanges(true);
	};

	const customCellRender = (td, props) => (
		<CellRender
			originalProps={props}
			td={td}
			enterEdit={enterEdit}
			editField={editField}
		/>
	);

	const customRowRender = (tr, props) => (
		<RowRender
			originalProps={props}
			tr={tr}
			exitEdit={exitEdit}
			editField={editField}
		/>
	);

	return (
		<div className="user_card">
			<Grid
				data={data}
				rowHeight={50}
				onItemChange={itemChange}
				cellRender={customCellRender}
				rowRender={customRowRender}
				editField="inEdit"
			>
				<GridToolbar>
					<button
						title="Save Changes"
						className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
						onClick={saveChanges}
						disabled={!changes}
					>
						Save Changes
					</button>
					<button
						title="Cancel Changes"
						className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
						onClick={cancelChanges}
						disabled={!changes}
					>
						Cancel Changes
					</button>
					<button
						className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
						onClick={onHandleBackHome}
					>
						BACK TO HOME
					</button>
				</GridToolbar>
				<Column field="UserName" title="User Name" />
				<Column field="FullName" title="Full Name" />
				<Column field="Enabled" title="Enabled" editor="boolean" />
			</Grid>
		</div>
	);
};
