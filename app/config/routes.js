import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import requireAuth from '../utils/requireAuth'

import Main from '../components/Main'
import Home from '../components/Home'


const routes = (
	<Router history={hashHistory}>
		<Route path='/' component={Main}>
			<IndexRoute component={Home} />
		</Route>
	</Router>
);

export default routes