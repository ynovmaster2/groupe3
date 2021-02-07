/* eslint-disable consistent-return */
const Oragnisme = require("../models/organisme").model

exports.create = (req, res) => {
	const organisme = new Oragnisme({
		nom: req.body.nom,
	})
	organisme.save().then(
		(data) => {
			if (data.errors) res.status(400).send(data.errors)
			else res.send(data)
		},
		(e) => res.status(500).send(e)
	)
}

exports.findAll = (req, res) => {
	Oragnisme.find()
		.then((organisme) => {
			res.status(200).send(organisme)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message,
			})
		})
}

exports.findOne = (req, res) => {
	Oragnisme.findById(req.params.organismetId)
		.then((organisme) => {
			if (!organisme) {
				return res.status(404).send({
					message: `Organisme not found with id ${req.params.organismetId}`,
				})
			}
			res.send(organisme)
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Organisme not found with id ${req.params.organismetId}`,
				})
			}
			return res.status(500).send({
				message: `Error retrieving organisme with id ${req.params.organismetId}`,
			})
		})
}

exports.update = (req, res) => {
	Oragnisme.findByIdAndUpdate(
		req.params.organismetId,
		{
			nom: req.body.nom,
		},
		{ new: true }
	)
		.then((organisme) => {
			if (!organisme) {
				return res.status(404).send({
					message: `Oragnisme not found with id ${req.params.documentId}`,
				})
			}
			res.send(organisme)
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Oragnisme not found with id ${req.params.organismetId}`,
				})
			}
			return res.status(500).send({
				message: `Error updating oragnisme with id ${req.params.organismetId}`,
			})
		})
}

exports.deleteOrganisme = (req, res) => {
	Oragnisme.findByIdAndRemove(req.params.organismetId)
		.then((organisme) => {
			if (!organisme) {
				return res.status(404).send({
					message: `Organisme not found with id ${req.params.organismetId}`,
				})
			}
			res.send({ message: "Organisme deleted successfully!" })
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: `Oragnisme not found with id ${req.params.organismetId}`,
				})
			}
			return res.status(500).send({
				message: `Could not delete oragnisme with id ${req.params.organismetId}`,
			})
		})
}
