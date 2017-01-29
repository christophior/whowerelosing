import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import * as firebase from 'firebase'
import SubmitStory from './SubmitStory'
import { PageHeader, Button, ButtonGroup, Col } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2' 
import chartColors from '../data/chartColors.json'


const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

const Home = React.createClass({
	getInitialState () {
		return {
			isLoggedIn: (null !== firebase.auth().currentUser),
			occupations: {},
			nationalities: {}
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

		let databaseRef = firebase.database().ref();
		databaseRef.child('occupations').once('value')
			.then((snapshot) => {
				console.log(snapshot.val());
				this.setState({occupations: snapshot.val()});
			});

		databaseRef.child('nationalities').once('value')
			.then((snapshot) => {
				console.log(snapshot.val());
				this.setState({nationalities: snapshot.val()});
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
	generateChartData (data) {
		let dataKeys = Object.keys(data),
			count = [];

		dataKeys.forEach((key) => {
			count.push(data[key]);
		});

		return {
			labels: dataKeys,
			datasets: [{ data: count, backgroundColor: chartColors, hoverBackgroundColor: chartColors}] 
		};
	},
	render () {
		let { occupations, nationalities } = this.state; 

		let occupationData = this.generateChartData(occupations),
			nationalityData = this.generateChartData(nationalities);

		let signInButtons = (
			<Col smOffset={2} sm={8}>
				 <div style={wellStyles}>
					<Button bsStyle="primary" bsSize="large" onClick={this.signInWithTwitter} block>Sign In With Twitter</Button>
				</div>
				<p>Sign in with Twitter to share your story</p>
			</Col>
		);

		let buttonsShown = this.state.isLoggedIn ? <SubmitStory /> : signInButtons;
		return (
			<div className='col-sm-12 text-center'>
				<PageHeader>A view of who we're losing <small>because of the Executive Order signed by president Trump</small></PageHeader>
				<Col sm={6}>
					<Doughnut data={occupationData} />
				</Col>
				<Col sm={6}>
					<Doughnut data={nationalityData} />
				</Col>
				<hr />
				<div className='col-sm-12 text-center' style={{paddingTop: '25px'}}>
					{buttonsShown}
				</div>
			</div>
		);
	}
});

export default Home