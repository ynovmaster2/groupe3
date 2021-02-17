import React, { Component } from "react"
import Organisme from "../components/organisme"
import Cookies from "cookies"

export default class Organismes extends Component {
	state = { organismes: [] }
	componentDidMount() {
		this.setState({ organismes: this.props.organismes })
	}

	submit = (organisme) => {
		return fetch(
			`${process.env.apiPublicUrl}/organisme/${organisme._id ?? ""}?token=${this.props.token}`,
			{
				method: organisme._id ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(organisme),
			}
		)
			.then((response) => response.json())
			.then((e) => {
				!organisme._id &&
					this.setState({ organismes: [...this.state.organismes, e.data] })
				console.log("update", e)
			})
	}
	delete = (organisme) => {
		return fetch(`${process.env.apiPublicUrl}/organisme/${organisme._id}?token=${this.props.token}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((r) => {
				const ar = [...this.state.organismes]
				const index = ar.findIndex((e) => e._id === organisme._id)
				index !== -1 && ar.splice(index, 1)
				this.setState({ organismes: ar })
				console.log("delete", r)
			})
	}
	render() {
		return (
			<>
				<a> organismes : {this.state.organismes.length}</a>
				<React.Fragment>
					<ul>
						{this.state.organismes.map((e, i) => (
							<Organisme
								key={e._id}
								submit={this.submit}
								data={e}
								delete={this.delete}
							/>
						))}
					</ul>
				</React.Fragment>
				<Organisme submit={this.submit} autoclear />
			</>
		)
	}
}

// only in page dir
export async function getServerSideProps(context) {
	const cookies = new Cookies(context.req, context.res)
	const token = context.query.token ?? cookies.get("token") ?? null // url token | cookie
	const organismes = await fetch(`${process.env.apiUrl}/organisme?token=${token}`)
		.then((response) => response.json())
		.then((res) => {
			if (res.code === 200) return res.data
			else console.error("get organisme res:", res) // server log
			return []
		})
	return {
		props: { organismes, token }, // will be passed to the page component as props
	}
}
