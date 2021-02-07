/* eslint-disable consistent-return */
const Document = require("../models/document").model

exports.create = (req, res) => {
	const document = new Document({
		nom: req.body.nom,
		path: req.body.path,
	})

	document.save().then(
		(data) => {
			if (data.errors) res.status(400).send(data.errors)
			else res.send(data)
		},
		(e) => res.status(500).send(e)
	)
}

exports.findAll = (req, res) => {
	Document.find()
		.then((document) => {
			res.status(200).send(document)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message,
			})
		})
}

exports.findOne = (req, res) => {
	Document.findById(req.params.documentId)
		.then((document) => {
			if (!document) {
				return res.status(404).send({
					message: `Document not found with id ${req.params.documentId}`,
				})
			}
			res.send(document)
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Docuement not found with id ${req.params.documentId}`,
				})
			}
			return res.status(500).send({
				message: `Error retrieving document with id ${req.params.documentId}`,
			})
		})
}

exports.update = (req, res) => {
	Document.findByIdAndUpdate(
		req.params.documentId,
		{
			nom: req.body.nom,
			path: req.body.path,
		},
		{ new: true }
	)
		.then((document) => {
			if (!document) {
				return res.status(404).send({
					message: `Note not found with id ${req.params.documentId}`,
				})
			}
			res.send(document)
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Note not found with id ${req.params.documentId}`,
				})
			}
			return res.status(500).send({
				message: `Error updating note with id ${req.params.documentId}`,
			})
		})
}

exports.deleteDocument = (req, res) => {
	Document.findByIdAndRemove(req.params.documentId)
		.then((document) => {
			if (!document) {
				return res.status(404).send({
					message: `Document not found with id ${req.params.documentId}`,
				})
			}
			res.send({ message: "Document deleted successfully!" })
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: `Document not found with id ${req.params.documentId}`,
				})
			}
			return res.status(500).send({
				message: `Could not delete document with id ${req.params.documentId}`,
			})
		})
}
