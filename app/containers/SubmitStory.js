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
        this.setState({ showModal: false });
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
        console.log(`name: ${name}`);
        console.log(`occupation: ${occupations[occupation]}`);
        console.log(`nationality: ${nationalities[nationality].label}`);
        console.log(`age: ${age}`);
        console.log(`story: ${story}`);
        this.setState({ successMessage: 'Story successfully shared' });
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