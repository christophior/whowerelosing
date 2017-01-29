import React, { PropTypes } from 'react'
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox, Col, DropdownButton, MenuItem, Alert } from 'react-bootstrap'
import nationalities from '../data/nationalities.json'
import occupations from '../data/occupations.json'

function renderNationality (nationality, i) {
    return <option key={i} value={i}>{nationality.label}</option>
}

function renderOccupation (occupation, i) {
    return <option key={i} value={i}>{occupation}</option>
}

function renderAlertMessage (props) {
    if (props.successMessage !== '') {
        return (<Alert bsStyle="success">
                    <strong>Success!</strong> {props.successMessage}
                </Alert>);
    } else if (props.errorMessage !== '') {
        return (<Alert bsStyle="danger">
                    <strong>Error!</strong> {props.errorMessage}
                </Alert>);
    }
}

function renderNameSection (props) {
    return (
        <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>Name</Col>
            <Col sm={10}>
                <FormControl type="text" placeholder="Name" onChange={props.handleNameUpdate} disabled={props.isAnonymous} />
            </Col>
            <Col smOffset={2} sm={10}>
                <Checkbox onChange={props.handleAnonymousUpdate}>Remain Anonymous</Checkbox>
            </Col>
        </FormGroup>
    );
}

function renderOccupationSection (props) {
    return (
        <FormGroup controlId="formHorizontalOccupation">
            <Col componentClass={ControlLabel} sm={2}>Occupation</Col>
            <Col sm={10}>
                <select className="form-control" name="occupation" onChange={props.handleOccupationUpdate}>
                    {occupations.map(renderOccupation)}
                </select>
            </Col>
        </FormGroup>
    );
}

function renderNationalitySection (props) {
    return (
        <FormGroup controlId="formHorizontalNationality">
            <Col componentClass={ControlLabel} sm={2}>Nationality</Col>
            <Col sm={10}>
                <select className="form-control" name="nationality" onChange={props.handleNationalityUpdate}>
                    {nationalities.map(renderNationality)}
                </select>
            </Col>
        </FormGroup>
    );
}

function renderAgeSection (props) {
    return (
        <FormGroup controlId="formHorizontalAge">
            <Col componentClass={ControlLabel} sm={2}>Age (in years)</Col>
            <Col sm={10}>
                <FormControl type="number" placeholder="Age" onChange={props.handleAgeUpdate} />
            </Col>
        </FormGroup>
    );
}

function renderStorySection (props) {
    return (
        <FormGroup controlId="formHorizontalStory">
            <Col componentClass={ControlLabel} sm={2}>Your Story</Col>
            <Col sm={10}>
                <textarea style={{resize: "none"}} className="form-control" rows="4" cols="50" onChange={props.handleStoryUpdate}>
                </textarea>
            </Col>
        </FormGroup>
    );
}

function renderModalButton (props) {
    if (props.successMessage !== '') {
        return <Button type="button" onClick={props.closeModal}>Done</Button>;
    } else {
        return <Button type="submit" onClick={props.handleSubmit}>Share</Button>;
    }
}

function SubmissionModal (props) {
    return (
        <Modal show={props.showModal} onHide={props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Share Your Story</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form horizontal>
                    {renderNameSection(props)}
                    
                    {renderOccupationSection(props)}
                    
                    {renderNationalitySection(props)}
                    
                    {renderAgeSection(props)}
                    
                    {renderStorySection(props)}
                </Form>
                {renderAlertMessage(props)}
            </Modal.Body>
            <Modal.Footer>
                {renderModalButton(props)}
            </Modal.Footer>
        </Modal>
    );
}

SubmissionModal.propTypes = {
    handleNameUpdate: PropTypes.func.isRequired,
    handleAnonymousUpdate: PropTypes.func.isRequired,
    handleOccupationUpdate: PropTypes.func.isRequired,
    handleNationalityUpdate: PropTypes.func.isRequired,
    handleAgeUpdate: PropTypes.func.isRequired,
    handleStoryUpdate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
	isAnonymous: PropTypes.bool.isRequired,
	successMessage: PropTypes.string.isRequired,
	errorMessage: PropTypes.string.isRequired,
	showModal: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
};

export default SubmissionModal