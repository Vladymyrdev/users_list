import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import './styles/index.css';
import '@progress/kendo-theme-default/dist/all.css';
import { App } from './components/App';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
