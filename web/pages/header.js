import { Component } from "react"
import "../styles/Header.module.css"
import User from "../service/user.service"

export default class Header extends Component{
	componentDidMount() {
		User.user("")
	}
	render(){
		return(
		<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
				<a className="navbar-brand" href="#">Logo</a>
				<ul className="navbar-nav">
					<li className="nav-iteæm">
					<a className="nav-link" href="#">Projet</a>
					</li>
					<li className="nav-item">
					<a className="nav-link" href="#">User</a>
					</li>
					<li className="nav-item dropdown">
					<a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
						Menu
					</a>
					<div className="dropdown-menu">
						<a className="dropdown-item" href="#">Deonnection</a>
					</div>
					</li>
				</ul>
		</nav>
		)
	}
}