import React from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const Main = React.createClass({
	render () {
		return (
			<div className='main-container'>
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Who We're Losing</a>
					</Navbar.Brand>
					<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
					<Nav pullRight>
						<NavItem eventKey={1} href="#">Learn More</NavItem>
					</Nav>
					</Navbar.Collapse>
				</Navbar>
				{this.props.children}
			</div>
		)
	}
});

export default Main