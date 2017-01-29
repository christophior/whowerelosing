import React, { PropTypes } from 'react'
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox, Col, DropdownButton, MenuItem } from 'react-bootstrap'
import nationalities from '../data/nationalities.json'
import occupations from '../data/occupations.json'

function renderNationality (nationality, i) {
    return <option key={i} value={i}>{nationality.label}</option>
}

function renderOccupation (occupation, i) {
    return <option key={i} value={i}>{occupation}</option>
}

function SubmissionModal (props) {
    return (
        <Modal show={props.showModal} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Share Your Story</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>Name</Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Name" />
                        </Col>
                        <Col smOffset={2} sm={10}>
                            <Checkbox>Remain Anonymous</Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalOccupation">
                        <Col componentClass={ControlLabel} sm={2}>Occupation</Col>
                        <Col sm={10}>
                            <select className="form-control" name="occupation">
                                {occupations.map(renderOccupation)}
                            </select>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalNationality">
                        <Col componentClass={ControlLabel} sm={2}>Nationality</Col>
                        <Col sm={10}>
                            <select className="form-control" name="nationality">
                                {nationalities.map(renderNationality)}
                            </select>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalAge">
                        <Col componentClass={ControlLabel} sm={2}>Age (in years)</Col>
                        <Col sm={10}>
                            <FormControl type="number" placeholder="Age" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalStory">
                        <Col componentClass={ControlLabel} sm={2}>Your Story</Col>
                        <Col sm={10}>
                            <textarea style={{resize: "none"}} className="form-control" rows="4" cols="50">
                            </textarea>
                        </Col>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit">Share</Button>
            </Modal.Footer>
        </Modal>
    );
}

SubmissionModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

export default SubmissionModal