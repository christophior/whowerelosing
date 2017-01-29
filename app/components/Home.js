import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import * as firebase from 'firebase'

import SubmitStory from '../containers/SubmitStory'

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

const Home = React.createClass({
	getInitialState () {
		return {
			isLoggedIn: (null !== firebase.auth().currentUser)
		}
	},
	componentDidMount () {
		firebase.auth().onAuthStateChanged(firebaseUser => {
			if (this.isMounted()) { // this is bad :/
				this.setState({
					isLoggedIn: (null !== firebaseUser)
				});
			}
			console.log('Are we logged in? ', null !== firebaseUser);
		});
	},
	render () {
		return (
			<div className='col-sm-12 text-center'>
				<h1>Home Page</h1>
				<SubmitStory />
			</div>
		)
	}
});

export default Home