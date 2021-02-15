const { formatRes } = require("../utils/api")
const { callback, getUser, getUri } = require("../services/oauth2")

exports.getUri = (req, res) => res.redirect(getUri())

exports.callback = (req, res) =>
	callback(req.originalUrl).then(
		(token) => res.redirect(`${process.env.CONFIG_AUTH_REDIRECT_URI}${token}`),
		(err) => formatRes(res, null, 500, err)
	)

// token -> bdd user
exports.user = (req, res) =>
	getUser(req.params.token).then(
		(data) => formatRes(res, data),
		(err) => formatRes(res, null, 500, err)
	)
