import React, { Component } from "react"
import Document from "../components/document"

export default class Documents extends Component {
	state = { documents: [] }
	componentDidMount() {
		this.setState({ documents: this.props.documents })
	}

	submit = (document) => {
		return fetch(`${process.env.apiPublicUrl}/document/${document._id ?? ""}`, {
			method: document._id ? "PUT" : "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(document),
		})
			.then((response) => response.json())
			.then((e) => {
				!document._id &&
					this.setState({ documents: [...this.state.documents, e.data] })
				console.log("update", e)
			})
	}
	delete = (document) => {
		return fetch(`${process.env.apiPublicUrl}/document/${document._id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((r) => {
				const ar = [...this.state.documents]
				const index = ar.findIndex((e) => e._id === document._id)
				index !== -1 && ar.splice(index, 1)
				this.setState({ documents: ar })
				console.log("delete", r)
			})
	}
	render() {
		return (
			<>
				<a> documents : {this.state.documents.length}</a>
				<React.Fragment>
					<ul>
						{this.state.documents.map((e, i) => (
							<Document
								key={e._id}
								submit={this.submit}
								data={e}
								delete={this.delete}
							/>
						))}
					</ul>
				</React.Fragment>
				<Document submit={this.submit} autoclear />
			</>
		)
	}
}

// only in page dir
export async function getServerSideProps(context) {
	const documents = await fetch(`${process.env.apiUrl}/document`)
		.then((response) => response.json())
		.then((res) => {
			if (res.code === 200) return res.data
			else console.error("get document res:", res) // server log
			return []
		})
	return {
		props: { documents: documents }, // will be passed to the page component as props
	}
}
