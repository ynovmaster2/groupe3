import React, { Component } from "react"
import "../styles/Header.module.css"
import User from "../services/user.service"

export default class Header extends Component {
	async componentDidMount() {
		// console.log((await User.user()).props.data)
	}

	render() {
		return (
			<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
				<a className="navbar-brand" href="#">
					Logo
				</a>
				<ul className="navbar-nav">
					<li className="nav-iteæm">
						<a className="nav-link" href="/projet">
							Projet
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/user">
							User
						</a>
					</li>
					<li className="nav-item dropdown">
						<a
							className="nav-link dropdown-toggle"
							id="navbardrop"
							data-toggle="dropdown"
						>
							Menu
						</a>
						<div className="dropdown-menu">
							<a className="dropdown-item" href="#">
								Deonnection
							</a>
						</div>
					</li>
				</ul>
			</nav>
		)
	}
}
