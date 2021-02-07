const Document = require("../models/document").model
const { formatRes } = require("../utils/api")

exports.create = (req, res) => {
	new Document(req.body).save().then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)
}

exports.findAll = (req, res) => {
	Document.find().then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)
}

exports.findOne = (req, res) => {
	Document.findById(req.params.id).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`Document not found with id ${req.params.id}`
				)
			return formatRes(res, data)
		},
		(err) => formatRes(res, null, 500, err)
	)
}

exports.update = (req, res) => {
	Document.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`Document not found with id ${req.params.id}`
				)
			return formatRes(res, data)
		},
		(err) => formatRes(res, null, 500, err)
	)
}

exports.deleteDocument = (req, res) => {
	Document.findByIdAndRemove(req.params.id).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`Document not found with id ${req.params.id}`
				)
			return formatRes(res, "Document deleted successfully!")
		},
		(err) => formatRes(res, null, 500, err)
	)
}
