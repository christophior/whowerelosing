import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import * as firebase from 'firebase'
import SubmissionModal from '../components/SubmissionModal'
import { Button } from 'react-bootstrap'

import nationalities from '../data/nationalities.json'
import occupations from '../data/occupations.json'

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

const SubmitStory = React.createClass({
	getInitialState () {
		return {
			showModal: false,
            name: null,
            isAnonymous: false,
            occupation: null,
            nationality: null,
            age: null,
            story: null,
            errorMessage: '',
            successMessage: ''
		}
	},
    closeModal () {
        // reset state
        this.setState({
			showModal: false,
            name: null,
            isAnonymous: false,
            occupation: null,
            nationality: null,
            age: null,
            story: null,
            errorMessage: '',
            successMessage: ''
		});
    },
    openModal () {
        this.setState({ showModal: true });
    },
    onNameUpdate (e) {
        this.setState({ name: e.target.value });
    },
    onAnonymousUpdate (e) {
        this.setState({ isAnonymous: e.target.checked });
    },
    onOccupationUpdate (e) {
        this.setState({ occupation: e.target.value });
    },
    onNationalityUpdate (e) {
        this.setState({ nationality: e.target.value });
    },
    onAgeUpdate (e) {
        this.setState({ age: e.target.value });
    },    
    onStoryUpdate (e) {
        this.setState({ story: e.target.value });
    },
    onSubmit (e) {
        let { name, isAnonymous, occupation, nationality, age, story } = this.state;
        name = isAnonymous ? 'Anonymous' : name;

        if (isNaN(occupation) || occupation <= 0 || occupation >= occupations.length) {
            this.setState({ errorMessage: 'Invalid occupation' });
        } else if (isNaN(nationality) || nationality <= 0 || nationality >= nationalities.length) {
            this.setState({ errorMessage: 'Invalid nationality' });
        } else if (isNaN(age) || age < 0 || age >= 125) {
            this.setState({ errorMessage: 'Invalid age' });
        } else {
            occupation = occupations[occupation];
            nationality = nationalities[nationality].label;

            console.log(`name: ${name}`);
            console.log(`occupation: ${occupation}`);
            console.log(`nationality: ${nationality}`);
            console.log(`age: ${age}`);
            console.log(`story: ${story}`);

            let data = {
                name, occupation, nationality, age, story
            };
            this.submitStoryToFirebase(data);
            this.incrementOccupationInFirebase(data);
            this.incrementNationalityInFirebase(data);
        }
    },
    submitStoryToFirebase (data) {
        let databaseRef = firebase.database().ref().child('experiences');
        let experienceKey = databaseRef.push().key;

        let updates = {};
        updates['/' + experienceKey] = data;

        databaseRef.update(updates, (error) => {
            if (error) {
                this.setState({ errorMessage: 'Error in sharing story' });
            } else {
                this.setState({ successMessage: 'Story successfully shared' });
            }
        });
    },
    incrementOccupationInFirebase (data) {
        let databaseRef = firebase.database().ref().child('occupations').child(data.occupation);
        databaseRef.transaction((occupation) => {
            if (occupation) {
                occupation = occupation + 1;
            } else {
                occupation = 1;
            }

            return occupation;
        });
    },
    incrementNationalityInFirebase (data) {
        let databaseRef = firebase.database().ref().child('nationalities').child(data.nationality);
        databaseRef.transaction((nationality) => {
            if (nationality) {
                nationality = nationality + 1;
            } else {
                nationality = 1;
            }

            return nationality;
        });
    },
	render () {
		return (
            <div className='col-sm-12'>
                <div style={wellStyles}>
                    <Button bsStyle="primary" bsSize="large" onClick={this.openModal} block>Submit Your Story</Button>
                </div>
                <SubmissionModal
                    handleNameUpdate={this.onNameUpdate}
                    handleAnonymousUpdate={this.onAnonymousUpdate}
                    handleOccupationUpdate={this.onOccupationUpdate}
                    handleNationalityUpdate={this.onNationalityUpdate}
                    handleAgeUpdate={this.onAgeUpdate}
                    handleStoryUpdate={this.onStoryUpdate}
                    handleSubmit={this.onSubmit}
                    isAnonymous={this.state.isAnonymous}
                    successMessage={this.state.successMessage}
                    errorMessage={this.state.errorMessage}
                    showModal={this.state.showModal}
                    closeModal={this.closeModal} />
            </div>
		)
	}
});

export default SubmitStory