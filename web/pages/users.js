import React, { Component } from "react"
import User from "../components/user"
import Cookies from "cookies"

export default class Users extends Component {
	state = { users: [] }
	componentDidMount() {
		this.setState({ users: this.props.users })
	}

	submit = (user) => {
		return fetch(`${process.env.apiPublicUrl}/user/${user._id ?? ""}?token=${this.props.token}`, {
			method: user._id ? "PUT" : "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((e) => {
				!user._id && this.setState({ users: [...this.state.users, e.data] })
				console.log("update", e)
			})
	}
	delete = (user) => {
		return fetch(`${process.env.apiPublicUrl}/user/${user._id}?token=${this.props.token}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((r) => {
				const ar = [...this.state.users]
				const index = ar.findIndex((e) => e._id === user._id)
				index !== -1 && ar.splice(index, 1)
				this.setState({ users: ar })
				console.log("delete", r)
			})
	}
	render() {
		return (
			<>
				<a> users : {this.state.users.length}</a>
				<React.Fragment>
					<ul>
						{this.state.users.map((e, i) => (
							<User
								key={e._id}
								submit={this.submit}
								data={e}
								delete={this.delete}
							/>
						))}
					</ul>
				</React.Fragment>
				<User submit={this.submit} autoclear />
			</>
		)
	}
}

// only in page dir
export async function getServerSideProps(context) {
	const cookies = new Cookies(context.req, context.res)
	const token = context.query.token ?? cookies.get("token") ?? null // url token | cookie
	const users = await fetch(`${process.env.apiUrl}/user?token=${token}`)
		.then((response) => response.json())
		.then((res) => {
			if (res.code === 200) return res.data
			else console.error("get user res:", res) // server log
			return []
		})
	return {
		props: { users: users, token }, // will be passed to the page component as props
	}
}