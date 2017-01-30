import React from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import '../assets/css/main.css'

const Main = React.createClass({
	render () {
		return (
			<div id='wrapper'>
				<section id="intro" className="wrapper featured style1">
					<div className="inner">
						<div className="content">
							<header>
								<h1>who we're losing</h1>
								<p>
								President Trump has signed numerous Executive Orders,<br/> 
								particularly one banning and deporting Muslims from 7 countries<br/>
								as well as banning refugees from entering the US.<br/>
								This website is to show that we are not only losing immigrants<br/>
								to this Order but also contributing members within our society.</p>
							</header>
						</div>
					</div>
				</section>
				{this.props.children}
				<section id="footer" className="wrapper style2">
						<div className="inner">
							<section>
								<header>
									<h3>how you can help</h3>
								</header>
								<p>If you would like to help protect the basic civil liberties of everyone in America please visit the American Civil Liberties 
								Union (ACLU) website to learn how you can contribute.- <a href="http://www.aclu.org">www.aclu.org</a> <br/><br/> <a href="https://twitter.com/ACLU">@ACLU</a></p>
							</section>
						</div>
						<div className="copyright">
							<p><a href="http://www.twitter.com/christophior" style={{color: "#1029ff", fontWeight: "600", fontSize: "medium"}}>@christophior</a></p>
						</div>
					</section>
			</div>
		)
	}
});

export default Main