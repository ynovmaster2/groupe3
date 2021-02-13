import { Component } from "react"
import Header from "../components/header"
import User from "../components/user"

export default class UserPage extends Component {
	render() {
		return (
			<>
				<Header></Header>
				<User></User>
			</>
		)
	}
}
