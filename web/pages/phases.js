import React, { Component } from "react"
import Phase from "../components/phase"

export default class Phases extends Component {
	state = { phases: [] }
	componentDidMount() {
		this.setState({ phases: this.props.phases })
	}

	submit = (phase) => {
		console.log("je qui dans fetch")
		return fetch(`${process.env.apiUrl}/phase/${phase._id ?? ""}`, {
			method: phase._id ? "PUT" : "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(phase),
		})
			.then((response) => response.json())
			.then((e) => {
				!phase._id && this.setState({ phases: [...this.state.phases, e.data] })
				console.log("update", e)
			})
	}
	delete = (phase) => {
		return fetch(`${process.env.apiUrl}/phase/${phase._id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((r) => {
				const ar = [...this.state.phases]
				const index = ar.findIndex((e) => e._id === phase._id)
				index !== -1 && ar.splice(index, 1)
				this.setState({ phases: ar })
				console.log("delete", r)
			})
	}
	render() {
		return (
			<>
				<a> phases : {this.state.phases.length}</a>
				<React.Fragment>
					<ul>
						{this.state.phases.map((e, i) => (
							<Phase
								key={e._id}
								submit={this.submit}
								data={e}
								delete={this.delete}
								users={this.props.users}
								documentations={this.props.documentations}
							/>
						))}
					</ul>
				</React.Fragment>
				<Phase
					submit={this.submit}
					autoclear
					users={this.props.users}
					documentations={this.props.documentations}
				/>
			</>
		)
	}
}

// only in page dir
export async function getServerSideProps(context) {
	const phases = await fetch(`${process.env.apiUrl}/phase`)
		.then((response) => response.json())
		.then((res) => {
			if (res.code === 200) return res.data
			else console.error("get phase res:", res) // server log
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
	return {
		props: { phases, users, documentations }, // will be passed to the page component as props
	}
}
