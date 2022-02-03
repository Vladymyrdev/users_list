import React from 'react';
import { GRID_COL_INDEX_ATTRIBUTE } from '@progress/kendo-react-grid';
import { useTableKeyboardNavigation } from '@progress/kendo-react-data-tools';

const CustomCell = (props) => {
	const field = props.field || '';
	const value = props.dataItem[field];
	const navigationAttributes = useTableKeyboardNavigation(props.id);
	return (
		<td
			style={{
				textAlign: 'center',
				color: value ? props.myProp[0].color : props.myProp[1].color,
			}}
			colSpan={props.colSpan}
			role={'gridcell'}
			aria-colindex={props.ariaColumnIndex}
			aria-selected={props.isSelected}
			{...{
				[GRID_COL_INDEX_ATTRIBUTE]: props.columnIndex,
			}}
			{...navigationAttributes}
		>
			{props.dataItem[props.field] ? 'Yes' : 'No'}
		</td>
	);
};

const customData = [
	{
		color: 'rgb(145, 238, 145)',
	},
	{
		color: 'rgb(248, 111, 111)',
	},
];

export const MyCustomCell = (props) => (
	<CustomCell {...props} myProp={customData} />
);
