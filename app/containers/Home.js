import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import * as firebase from 'firebase'
import SubmitStory from './SubmitStory'
import { PageHeader, Button, ButtonGroup, Col } from 'react-bootstrap'


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
			console.log('Are we logged in? ', firebaseUser.uid);
		});
	},
	signInWithTwitter () {
		console.log(firebase.auth.TwitterAuthProvider());
		var provider = new firebase.auth.TwitterAuthProvider();

		firebase.auth().signInWithPopup(provider).then((result) => {
			  // For accessing the Twitter API.
			var token = result.credential.accessToken;
			var secret = result.credential.secret;
			// The signed-in user info.
			var user = result.user;
			console.log(user);
		});
	},
	render () {
		let signInButtons = (
			<Col smOffset={2} sm={8}>
				<p>Sign in with Twitter to share your story</p>
				<ButtonGroup vertical block>
					<Button bsStyle="primary" bsSize="large" onClick={this.signInWithTwitter} block>Sign In With Twitter</Button>
				</ButtonGroup>
			</Col>
		);

		let buttonsShown = this.state.isLoggedIn ? <SubmitStory /> : signInButtons;
		return (
			<div className='col-sm-12 text-center'>
				<PageHeader>A view of who we're losing <small>because of the Executive Order signed by president Trump</small></PageHeader>
				{buttonsShown}
			</div>
		)
	}
});

export default Home