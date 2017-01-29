import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import * as firebase from 'firebase'
import SubmissionModal from '../components/SubmissionModal'

import { Button } from 'react-bootstrap'

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

const SubmitStory = React.createClass({
	getInitialState () {
		return {
			showModal: false
		}
	},
    close () {
        this.setState({ showModal: false });
    },
    open () {
        this.setState({ showModal: true });
    },
	render () {
		return (
            <div className='col-sm-12'>
                <div className="well" style={wellStyles}>
                    <Button bsStyle="primary" bsSize="large" onClick={this.open} block>Submit Your Story</Button>
                </div>
                <SubmissionModal 
                    showModal={this.state.showModal}
                    close={this.close} />
            </div>
		)
	}
});

export default SubmitStory