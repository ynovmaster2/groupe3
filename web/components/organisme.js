import Form from "@rjsf/bootstrap-4"
import React, { Component } from "react"

const schema = {
	title: "Organisme",
	type: "object",
	required: ["nom"],
	properties: {
		nom: { type: "string", title: "nom" },
	},
}
export default class Organisme extends Component {
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
					<h2>{this.state.data?.nom}</h2>
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
