import Form from "@rjsf/bootstrap-4"
import React, { Component } from "react"
/*
const schema = {
	title: "Phase",
	type: "object",
	required: ["documentation", "livrable", "employes"],
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
			title: "documentation",
			items: {
				type: "string",
				enum: ["60298185f6ffbd02ef7f283b"],
			},
		},
		livrable: {
			type: "array",
			title: "livrable",
			items: {
				type: "string",
				enum: ["60298185f6ffbd02ef7f283b"],
			},
		},
		employes: {
			type: "array",
			title: "employes",
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
		documentations: [], // ["60298185f6ffbd02ef7f283b"],
		users: [], //["60298185f6ffbd02ef7f283b"],
	}
	componentDidMount() {
		this.props.data && this.setState({ data: this.props.data })

		this.props.documentations &&
			this.setState({
				documentations: this.props.documentations.map((e) => e._id),
			})
		this.props.users &&
			this.setState({ users: this.props.users.map((e) => e._id) })
	}
	getSchema = () => {
		return {
			title: "Phase",
			type: "object",
			required: ["documentation", "livrable", "employes"],
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
					title: "documentation",
					items: {
						type: "string",
						enum: this.state.documentations,
					},
				},
				livrable: {
					type: "array",
					title: "livrable",
					items: {
						type: "string",
						enum: this.state.documentations,
					},
				},
				employes: {
					type: "array",
					title: "employes",
					items: {
						type: "string",
						enum: this.state.users,
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
					{this.state.data?.livrable && (
						<div>
							<a>livrable</a>
							<React.Fragment>
								<ul>
									{this.state.data.livrable.map((e, i) => (
										<li> {e} </li>
									))}
								</ul>
							</React.Fragment>
						</div>
					)}
					{this.state.data?.employes && (
						<div>
							<a>employes</a>
							<React.Fragment>
								<ul>
									{this.state.data.employes.map((e, i) => (
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
