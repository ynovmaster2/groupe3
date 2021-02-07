/* eslint-disable consistent-return */
const User = require("../models/user").model

exports.create = (req, res) => {
	const organisme = new User({
		username: req.body.username,
		email: req.body.email,
		role: req.body.role,
		tel: req.body.tel,
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
	User.find()
		.then((user) => {
			res.status(200).send(user)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message,
			})
		})
}

exports.findOne = (req, res) => {
	User.findById(req.params.userId)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: `User not found with id ${req.params.userId}`,
				})
			}
			res.send(user)
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `User not found with id ${req.params.userId}`,
				})
			}
			return res.status(500).send({
				message: `Error retrieving user with id ${req.params.userId}`,
			})
		})
}

exports.update = (req, res) => {
	User.findByIdAndUpdate(
		req.params.userId,
		{
			username: req.body.username,
			email: req.body.email,
			role: req.body.role,
			tel: req.body.tel,
		},
		{ new: true }
	)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: `User not found with id ${req.params.userId}`,
				})
			}
			res.send(user)
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `User not found with id ${req.params.userId}`,
				})
			}
			return res.status(500).send({
				message: `Error updating user with id ${req.params.userId}`,
			})
		})
}

exports.deleteUser = (req, res) => {
	User.findByIdAndRemove(req.params.userId)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: `User not found with id ${req.params.userId}`,
				})
			}
			res.send({ message: "User deleted successfully!" })
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: `User not found with id ${req.params.userId}`,
				})
			}
			return res.status(500).send({
				message: `Could not delete User with id ${req.params.userId}`,
			})
		})
}
