import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import requireAuth from '../utils/requireAuth'

import Main from '../containers/Main'
import Home from '../containers/Home'


const routes = (
	<Router history={browserHistory}>
		<Route path='/' component={Main}>
			<IndexRoute component={Home} />
		</Route>
	</Router>
);

export default routes