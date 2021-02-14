import Form from "@rjsf/core"
import React, { Component } from "react"

function ArrayFieldTemplate(props) {
	return (
	  <div>
		  <hr/>
		{props.title}
		{props.items.map(element => element.children)}
		{props.canAdd && <button type="button" onClick={props.onAddClick}>+</button>}
	  </div>
	);
  }

const schema = {
	title: "Phase",
	type: "object",
	required: ["documentation","livrable","employes"],
	properties: {
		code: { type: "string", title: "code" },
		libelle: { type: "string", title: "libelle" },
		description: { type: "string", title: "description" },
		PourcentageMontant: { type: "integer", title: "PourcentageMontant" },
		Paiement: { type: "boolean", title: "Paiement" },
		realisation: { type: "boolean", title: "realisation" },
		facturation: { type: "boolean", title: "facturations" },
		documentation: {
			type: "array",
			title : "documentation",
			items: {
				type: "string",
				enum: [
					"60298185f6ffbd02ef7f283b",
				],
			  },
		},
		livrable: {
			type: "array",
			title : "livrable",
			items: {
				type: "string",
				enum: [
					"60298185f6ffbd02ef7f283b",
				],
			  },
		},
		employes: {
			type: "array",
			title : "employes",
			items: {
				type: "string",
				enum: [
					"60298185f6ffbd02ef7f283b",
				],
			  },
		},
	},
}

export default class Document extends Component {
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
				ArrayFieldTemplate={ArrayFieldTemplate}
			/>
		) : (
			<div>
				<div>
					<h2>{this.state.data?.code}</h2>
					<a>{this.state.data?.libelle}</a>
					<a>{this.state.data?.description}</a>
					<a>{this.state.data?.PourcentageMontant}</a>
					<a>{this.state.data?.Paiement}</a>
					<a>{this.state.data?.realisation}</a>
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
