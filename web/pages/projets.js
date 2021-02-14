import React, { Component } from "react"
import Projet from "../components/projet"

export default class Projets extends Component {
	state = { projets: [] }
	componentDidMount() {
		this.setState({ projets: this.props.projets })
	}

	submit = (projet) => {
		console.log("je qui dans fetch")
		return fetch(`http://localhost:3000/projet/${projet._id ?? ""}`, {
			method: projet._id ? "PUT" : "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(projet),
		})
			.then((response) => response.json())
			.then((e) => {
				!projet._id && this.setState({ projets: [...this.state.projets, e.data] })
				console.log("update", e)
			})
	}
	delete = (projet) => {
		return fetch(`http://localhost:3000/projet/${projet._id}`, {
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
							/>
						))}
					</ul>
				</React.Fragment>
				<Projet submit={this.submit} autoclear />
			</>
		)
	}
}

// only in page dir
export async function getServerSideProps(context) {
	const projets = await fetch(
		//await fetch(`${process.env.apiUrl}/phase`)
		`http://localhost:3000/projet`
	)
		.then((response) => response.json())
		.then((res) => {
			if (res.code === 200) return res.data
			else console.error("get projet res:", res) // server log
			return []
		})
	return {
		props: { projets: projets }, // will be passed to the page component as props
	}
}
