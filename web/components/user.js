import Form from "@rjsf/bootstrap-4"
import React, { Component } from "react"

const schema = {
	title: "User",
	type: "object",
	required: ["username", "email", "role"],
	properties: {
		username: { type: "string", title: "username" },
		email: { type: "string", title: "email" },
		tel: { type: "string", title: "tel" },
		role: {
			type: "string",
			enum: [
				"user",
				"admin",
				"directeur",
				"chef",
				"comptable",
				"secretaire",
				"collaborateur",
			],
		},
	},
}
export default class User extends Component {
	state = { edit: false, data: {} }
	componentDidMount() {
		this.props.data && this.setState({ data: this.props.data })
	}

	submit = (val) => {
		this.setState({
			data: this.props.autoclear ? {} : val.formData,
			edit: false,
		})
		this.props.submit && this.props.submit(val.formData)
	}
	delete = (val) => {
		this.props.delete && this.props.delete(this.state.data)
	}
	render() {
		return this.state.edit ? (
			<Form
				schema={schema}
				formData={this.state.data}
				onSubmit={this.submit}
				onError={console.error}
			/>
		) : (
			<div>
				<div>
					<h2>{this.state.data?.username}</h2>
					<a>{this.state.data?.role}</a>
					<a>{this.state.data?.tel}</a>
					<a>{this.state.data?.email}</a>
				</div>
				<div>
					{!this.props.ro && (
						<button
							onClick={() => {
								this.setState({ edit: true })
							}}
						>
							edit
						</button>
					)}
					{this.props.delete && <button onClick={this.delete}>delete</button>}
				</div>
			</div>
		)
	}
}
