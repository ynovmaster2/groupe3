import Form from "@rjsf/bootstrap-4"
import React, { Component } from "react"
/*
const schema = {
	title: "Projet",
	type: "object",
	required: ["nom", "chef", "organisme"],
	properties: {
		nom: { type: "string", title: "nom" },
		code: { type: "string", title: "code" },
		description: { type: "string", title: "description" },
		montant: { type: "integer", title: "montant" },
		chef: {
			type: "string",
			enum: ["60298185f6ffbd02ef7f283e"],
		},
		equipe: {
			type: "array",
			title: "equipe",
			items: {
				type: "string",
				enum: ["60298185f6ffbd02ef7f283b"],
			},
		},
		documentation: {
			type: "array",
			title: "documentation",
			items: {
				type: "string",

				enum: ["60298185f6ffbd02ef7f283b"],
			},
		},
		organisme: {
			type: "string",
			title: "organisme",
			enum: ["60298185f6ffbd02ef7f283b"],
		},
		phase: {
			type: "array",
			title: "phase",
			items: {
				type: "string",
				enum: ["60298185f6ffbd02ef7f283b"],
			},
		},
	},
}
*/
export default class Document extends Component {
	state = {
		edit: false,
		data: {},
		users: [], //["60298185f6ffbd02ef7f283b"],
		documentations: [], //["60298185f6ffbd02ef7f283b"],
		organismes: [], //["60298185f6ffbd02ef7f283b"],
		phases: [], //["60298185f6ffbd02ef7f283b"],
	}
	componentDidMount() {
		this.props.data && this.setState({ data: this.props.data })

		this.props.phase &&
			this.setState({ phase: this.props.phase.map((e) => e._id) })
		this.props.organisme &&
			this.setState({ organisme: this.props.organisme.map((e) => e._id) })
		this.props.documentation &&
			this.setState({
				documentation: this.props.documentation.map((e) => e._id),
			})
		this.props.users &&
			this.setState({ users: this.props.users.map((e) => e._id) })
	}
	getSchema = () => {
		return {
			title: "Projet",
			type: "object",
			required: ["nom", "chef", "organisme"],
			properties: {
				nom: { type: "string", title: "nom" },
				code: { type: "string", title: "code" },
				description: { type: "string", title: "description" },
				montant: { type: "integer", title: "montant" },
				chef: {
					type: "string",
					enum: this.state.users,
				},
				equipe: {
					type: "array",
					title: "equipe",
					items: {
						type: "string",
						enum: this.state.users,
					},
				},
				documentation: {
					type: "array",
					title: "documentation",
					items: {
						type: "string",
						enum: this.state.documentations,
					},
				},
				organisme: {
					type: "string",
					title: "organisme",
					enum: this.state.organismes,
				},
				phase: {
					type: "array",
					title: "phase",
					items: {
						type: "string",
						enum: this.state.phases,
					},
				},
			},
		}
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
				schema={this.getSchema()}
				formData={this.state.data}
				onSubmit={this.submit}
				onError={console.error}
				// ArrayFieldTemplate={ArrayFieldTemplate}
			/>
		) : (
			<div>
				<div>
					<h2>{this.state.data?.nom}</h2>
					{this.state.data?.code && <a>code: {this.state.data?.code}</a>}
					<p>{this.state.data?.description}</p>
					{this.state.data?.montant && (
						<a>montant: {this.state.data?.montant}</a>
					)}
					{this.state.data?.chef && (
						<div>
							<a>chef: {this.state.data?.chef}</a>
						</div>
					)}
					{this.state.data?.equipe && (
						<div>
							<a>equipe</a>
							<React.Fragment>
								<ul>
									{this.state.data.equipe.map((e, i) => (
										<li> {e} </li>
									))}
								</ul>
							</React.Fragment>
						</div>
					)}
					{this.state.data?.documentation && (
						<div>
							<a>documentation</a>
							<React.Fragment>
								<ul>
									{this.state.data.documentation.map((e, i) => (
										<li> {e} </li>
									))}
								</ul>
							</React.Fragment>
						</div>
					)}
					{this.state.data?.organisme && (
						<a>organisme: {this.state.data?.organisme}</a>
					)}
					{this.state.data?.phase && (
						<div>
							<a>phase</a>
							<React.Fragment>
								<ul>
									{this.state.data.phase.map((e, i) => (
										<li> {e} </li>
									))}
								</ul>
							</React.Fragment>
						</div>
					)}
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
