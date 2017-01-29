import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import * as firebase from 'firebase'
import SubmitStory from './SubmitStory'
import { PageHeader } from 'react-bootstrap'


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
			// console.log('Are we logged in? ', null !== firebaseUser);
		});
	},
	render () {
		return (
			<div className='col-sm-12 text-center'>
				<PageHeader>A view of who we're losing <small>because of the Executive Order signed by president Trump</small></PageHeader>
				<SubmitStory />
			</div>
		)
	}
});

export default Home