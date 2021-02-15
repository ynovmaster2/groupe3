import React, { Component } from "react"
import Projet from "../components/projet"

export default class Projets extends Component {
	state = { projets: [] }
	componentDidMount() {
		this.setState({ projets: this.props.projets })
	}

	submit = (projet) => {
		console.log("je qui dans fetch")
		return fetch(`${process.env.apiUrl}/projet/${projet._id ?? ""}`, {
			method: projet._id ? "PUT" : "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(projet),
		})
			.then((response) => response.json())
			.then((e) => {
				!projet._id &&
					this.setState({ projets: [...this.state.projets, e.data] })
				console.log("update", e)
			})
	}
	delete = (projet) => {
		return fetch(`${process.env.apiUrl}/projet/${projet._id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((r) => {
				const ar = [...this.state.projets]
				const index = ar.findIndex((e) => e._id === projet._id)
				index !== -1 && ar.splice(index, 1)
				this.setState({ projets: ar })
				console.log("delete", r)
			})
	}
	render() {
		return (
			<>
				<a> projet : {this.state.projets.length}</a>
				<React.Fragment>
					<ul>
						{this.state.projets.map((e, i) => (
							<Projet
								key={e._id}
								submit={this.submit}
								data={e}
								delete={this.delete}
								users={this.props.users}
								documentations={this.props.documentations}
								organismes={this.props.organismes}
								phases={this.props.phases}
							/>
						))}
					</ul>
				</React.Fragment>
				<Projet
					submit={this.submit}
					autoclear
					users={this.props.users}
					documentations={this.props.documentations}
					organismes={this.props.organismes}
					phases={this.props.phases}
				/>
			</>
		)
	}
}

// only in page dir
export async function getServerSideProps(context) {
	const projets = await fetch(`${process.env.apiUrl}/projet`)
		.then((response) => response.json())
		.then((res) => {
			if (res.code === 200) return res.data
			else console.error("get projet res:", res) // server log
			return []
		})
	const users = await fetch(`${process.env.apiUrl}/user`)
		.then((response) => response.json())
		.then((res) => {
			if (res.code === 200) return res.data
			else console.error("get users res:", res) // server log
			return []
		})

	const documentations = await fetch(`${process.env.apiUrl}/document`)
		.then((response) => response.json())
		.then((res) => {
			if (res.code === 200) return res.data
			else console.error("get document res:", res) // server log
			return []
		})
	const organismes = await fetch(`${process.env.apiUrl}/organisme`)
		.then((response) => response.json())
		.then((res) => {
			if (res.code === 200) return res.data
			else console.error("get document res:", res) // server log
			return []
		})

	const phases = await fetch(`${process.env.apiUrl}/phase`)
		.then((response) => response.json())
		.then((res) => {
			if (res.code === 200) return res.data
			else console.error("get document res:", res) // server log
			return []
		})
	return {
		props: { projets, users, documentations, organismes, phases }, // will be passed to the page component as props
	}
}
