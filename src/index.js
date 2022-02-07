import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { RootRouter } from './routes/RootRouter';
import { UsersProvider } from './provider/UsersProvider';

import './styles/global.css';
import './styles/index.css';
import '@progress/kendo-theme-default/dist/all.css';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<UsersProvider>
				<RootRouter />
			</UsersProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
