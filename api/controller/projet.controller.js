const Projet = require("../models/projet").model
const { formatRes } = require("../utils/api")
const { hasrole, role } = require("../utils/authorization")

// eslint-disable-next-line no-bitwise
const roleSecretaireOrDirecteur = role.secretaire | role.directeur

exports.create = (req, res) =>
	new Projet(req.body).save().then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)
/**
 * renvoi tous les Projet pour role secretaire | directeur
 * renvoi les profets afecter a l utilisateur (chef|equipe)
 * @param {*} req express req -> req.user = authorization middleware
 * @param {*} res express res
 */
exports.findAll = (req, res) => {
	let filter = {}
	if (!hasrole(req.user.role, roleSecretaireOrDirecteur)) {
		// eslint-disable-next-line no-underscore-dangle
		const id = req.user._id
		filter = { $or: [{ chef: id }, { equipe: id }] }
	}
	return Projet.find(filter).then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)
}

/**
 * renvoi le Projet pour role secretaire | directeur
 * renvoi le profets si afecter a l utilisateur (chef|equipe)
 * @param {*} req express req -> req.user = authorization middleware
 * @param {*} res express res
 */
exports.findOne = (req, res) => {
	let filter = {}
	if (!hasrole(req.user.role, roleSecretaireOrDirecteur)) {
		// eslint-disable-next-line no-underscore-dangle
		const id = req.user._id
		filter = { $or: [{ chef: id }, { equipe: id }] }
	}
	return Projet.findById(req.params.id)
		.where(filter)
		.then(
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
	let filter = {}
	if (!hasrole(req.user.role, roleSecretaireOrDirecteur)) {
		// eslint-disable-next-line no-underscore-dangle
		const id = req.user._id
		filter = { $or: [{ chef: id }, { equipe: id }] }
	}
	return Projet.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.where(filter)
		.then(
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

exports.deleteProjet = (req, res) =>
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
