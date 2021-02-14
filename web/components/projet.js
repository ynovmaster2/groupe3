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
	title: "Projet",
	type: "object",
	required: ["nom", "chef","organisme"],
	properties: {
		nom: { type: "string", title: "nom" },
		code: { type: "string", title: "code" },
		description: { type: "string", title: "description" },
		montant: { type: "integer", title: "montant" },
		chef: {
			type: "string",
			enum: [
				"60298185f6ffbd02ef7f283e",
			],
		},
		equipe: {
			type: "array",
			title : "equipe",
			items: {
				type: "string",
				enum: [
					"60298185f6ffbd02ef7f283b",
				],
			  },
		},
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
		organisme: {
			type: "string",
			title : "organisme",
			enum: [
				"60298185f6ffbd02ef7f283b",
			],
		},
		phase: {
			type: "array",
			title : "phase",
			items: {
				type: "string",
				enum: [
					"60298185f6ffbd02ef7f283b",
				],
			  },
		}
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
					<h2>{this.state.data?.nom}</h2>
					<a>{this.state.data?.code}</a>
					<a>{this.state.data?.description}</a>
					<a>{this.state.data?.montant}</a>
					<a>{this.state.data?.chef}</a>
					<a>{this.state.data?.equipe}</a>
					<a>{this.state.data?.documentation}</a>
					<a>{this.state.data?.organisme}</a>
					<a>{this.state.data?.phase}</a>
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
