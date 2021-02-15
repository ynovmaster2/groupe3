const Projet = require("../models/projet").model
const { formatRes } = require("../utils/api")

exports.create = (req, res) => {
	new Projet(req.body).save().then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)
}

exports.findAll = (req, res) => {
	Projet.find().then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)
}

exports.findOne = (req, res) => {
	Projet.findById(req.params.id).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`Projet not found with id ${req.params.id}`
				)
			return formatRes(res, data)
		},
		(err) => formatRes(res, null, 500, err)
	)
}

exports.update = (req, res) => {
	Projet.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`Projet not found with id ${req.params.id}`
				)
			return formatRes(res, data)
		},
		(err) => formatRes(res, null, 500, err)
	)
}

exports.deleteProjet = (req, res) => {
	Projet.findByIdAndRemove(req.params.id).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`Projet not found with id ${req.params.id}`
				)
			return formatRes(res, "Projet deleted successfully!")
		},
		(err) => formatRes(res, null, 500, err)
	)
}
