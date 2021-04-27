import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';

import client from './apollo/client';
import App from './components/app';

import './index.sass';

if (module.hot) module.hot.accept();

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
