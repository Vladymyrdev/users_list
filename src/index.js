import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@progress/kendo-theme-default/dist/all.css';
import { App } from './components/App';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
