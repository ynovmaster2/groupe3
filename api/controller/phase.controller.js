const Phase = require("../models/phase").model
const { formatRes } = require("../utils/api")

exports.create = (req, res) => {
	new Phase(req.body).save().then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)
}

exports.findAll = (req, res) => {
	Phase.find().then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)
}

exports.findOne = (req, res) => {
	Phase.findById(req.params.id).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`Phase not found with id ${req.params.id}`
				)
			return formatRes(res, data)
		},
		(err) => formatRes(res, null, 500, err)
	)
}

exports.update = (req, res) => {
	Phase.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`Phase not found with id ${req.params.id}`
				)
			return formatRes(res, data)
		},
		(err) => formatRes(res, null, 500, err)
	)
}

exports.deletePhase = (req, res) => {
	Phase.findByIdAndRemove(req.params.id).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`Phase not found with id ${req.params.id}`
				)
			return formatRes(res, "Phase deleted successfully!")
		},
		(err) => formatRes(res, null, 500, err)
	)
}
