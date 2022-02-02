import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Detail } from '../pages/Detail';
import { RoutesEnum } from './constants';

export const RootRouter = () => {
	return (
		<Switch>
			<Route path={RoutesEnum.HOME} component={Home} exact />
			<Route path={RoutesEnum.DETAIL} component={Detail} exact />
			<Redirect to={RoutesEnum.HOME} />
		</Switch>
	);
};
