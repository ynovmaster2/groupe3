const User = require("../models/user").model
const { formatRes } = require("../utils/api")

exports.create = (req, res) => {
	new User(req.body).save().then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)
}

exports.findAll = (req, res) => {
	User.find().then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)
}

exports.findOne = (req, res) => {
	User.findById(req.params.id).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`User not found with id ${req.params.id}`
				)
			return formatRes(res, data)
		},
		(err) => formatRes(res, null, 500, err)
	)
}

exports.update = (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`User not found with id ${req.params.id}`
				)
			return formatRes(res, data)
		},
		(err) => formatRes(res, null, 500, err)
	)
}

exports.deleteUser = (req, res) => {
	User.findByIdAndRemove(req.params.id).then(
		(data) => {
			if (!data)
				return formatRes(
					res,
					null,
					404,
					`User not found with id ${req.params.id}`
				)
			return formatRes(res, "User deleted successfully!")
		},
		(err) => formatRes(res, null, 500, err)
	)
}
