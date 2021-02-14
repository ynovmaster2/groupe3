const { formatRes } = require("./api")
const { getUser } = require("../services/oauth2")

// 401 : utilisateur non authentifié ;
// 403 : accès refusé ;

exports.authorization = async (req, res, next, role = null) => {
	const token = req?.query?.token

	if (!token) formatRes(res, null, 401, "utilisateur non authentifié")
	else {
		getUser(token).then(
			(u) => {
				if (!u) formatRes(res, null, 401, "utilisateur non authentifié")
				else if (role && u.role !== role)
					formatRes(res, null, 403, "accès refusé")
				else {
					req.user = u
					next()
				}
			},
			(err) => formatRes(res, null, 500, err)
		)
	}
}
