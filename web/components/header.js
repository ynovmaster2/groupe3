import React, { Component } from "react"
import Link from "next/link"

export default class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
				<a className="navbar-brand" href="#">
					Logo
				</a>
				<ul className="navbar-nav">
					<li className="nav-iteæm">
						<Link href="/projet">
							<a className="nav-link">Projet</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/user">
							<a className="nav-link">User</a>
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}
