import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import * as firebase from 'firebase'
import SubmitStory from './SubmitStory'
import { PageHeader, Button, ButtonGroup, Col, Table } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2' 
import chartColors from '../data/chartColors.json'


const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

const Home = React.createClass({
	getInitialState () {
		return {
			isLoggedIn: (null !== firebase.auth().currentUser),
			occupations: {},
			nationalities: {},
			posts: []
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
		this.getOccupationsData();
		this.getNationalitiesData();
		this.getExperiencesData(0);
	},
	getOccupationsData () {
		let databaseRef = firebase.database().ref().child('occupations');
		databaseRef.once('value')
			.then((snapshot) => {
				let rawData = snapshot.val(),
					processedData = {};

				// so we can just get the top occupations for the chart
				let sortedKeys = Object.keys(rawData).sort(function(a,b){return rawData[a]-rawData[b]});
				sortedKeys = sortedKeys.slice(sortedKeys.length-4);
				sortedKeys.forEach((o) => processedData[o] = rawData[o]);
				this.setState({occupations: processedData});
			});
	},
	getNationalitiesData () {
		let databaseRef = firebase.database().ref().child('nationalities');
		databaseRef.once('value')
			.then((snapshot) => {
				let rawData = snapshot.val(),
					processedData = {};

				// so we can just get the top nationalities for the chart
				let sortedKeys = Object.keys(rawData).sort(function(a,b){return rawData[a]-rawData[b]});
				sortedKeys = sortedKeys.slice(sortedKeys.length-4);
				sortedKeys.forEach((n) => processedData[n] = rawData[n]);

				this.setState({nationalities: processedData});
			});
	},
	getExperiencesData (steps) {
		let databaseRef = firebase.database().ref().child('experiences').limitToFirst(10);
		databaseRef.once('value', (snapshot) => {
			this.setState({posts: snapshot.val()});
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
		// get the names from the data
		let dataKeys = Object.keys(data),
			count = [];

		// get the numbers for each name
		dataKeys.forEach((key) => {
			count.push(data[key]);
		});

		return {
			labels: dataKeys,
			datasets: [{ data: count, backgroundColor: chartColors, hoverBackgroundColor: chartColors}] 
		};
	},
	renderPostEntries () {
		let { posts } = this.state;
		let postKeys = Object.keys(posts);
		let tableRows = postKeys.map((key, i) => {
				let data = posts[key];
				return (
					<tr key={i}>
						<td>{data.name}</td>
						<td>{data.occupation}</td>
						<td>{data.nationality}</td>
						<td>{data.age}</td>
						<td>{data.story}</td>
					</tr>
				);
			});
		return (
			<tbody>
				{tableRows}
			</tbody>

		);
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

				<div className='col-sm-12 text-center' style={{padding: '25px 0'}}>
					{buttonsShown}
				</div>

				<Col smOffset={2} sm={8}>
					<Table striped bordered condensed hover>
						<thead>
							<tr>
								<th>Name</th>
								<th>Occupation</th>
								<th>Nationality</th>
								<th>Age</th>
								<th>Story</th>
							</tr>
						</thead>
						{this.renderPostEntries()}
					</Table>
				</Col>
			</div>
		);
	}
});

export default Home