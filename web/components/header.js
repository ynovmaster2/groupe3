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
						<Link href="/projets">
							<a className="nav-link">Projets</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/users">
							<a className="nav-link">Users</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/organismes">
							<a className="nav-link">Organisme</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/phases">
							<a className="nav-link">Phases</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/documents">
							<a className="nav-link">Documents</a>
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}
