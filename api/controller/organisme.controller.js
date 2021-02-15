const Oragnisme = require("../models/organisme").model
const { formatRes } = require("../utils/api")

exports.create = (req, res) =>
	new Oragnisme(req.body).save().then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)

exports.findAll = (req, res) =>
	Oragnisme.find().then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)

exports.findOne = (req, res) =>
	Oragnisme.findById(req.params.id).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`Oragnisme not found with id ${req.params.id}`
				)
			return formatRes(res, data)
		},
		(err) => formatRes(res, null, 500, err)
	)

exports.update = (req, res) =>
	Oragnisme.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`Oragnisme not found with id ${req.params.id}`
				)
			return formatRes(res, data)
		},
		(err) => formatRes(res, null, 500, err)
	)

// exports.deleteOragnisme = (req, res) =>
// 	Oragnisme.findByIdAndRemove(req.params.id).then(
// 		(data) => {
// 			if (!data)
// 				return formatRes(
// 					res,
// 					null,
// 					404,
// 					`Oragnisme not found with id ${req.params.id}`
// 				)
// 			return formatRes(res, "Oragnisme deleted successfully!")
// 		},
// 		(err) => formatRes(res, null, 500, err)
// 	)
