/* eslint-disable no-bitwise */
const { formatRes } = require("./api")
const { getUser } = require("../services/oauth2")

// 401 : utilisateur non authentifié ;
// 403 : accès refusé ;
const enumrole = {
	user: 1 << 1,
	admin: 1 << 2,
	directeur: 1 << 3,
	chef: 1 << 4,
	comptable: 1 << 5,
	secretaire: 1 << 6,
	collaborateur: 1 << 7,
}

function hasrole(role, roles) {
	return (enumrole[role] & roles) !== 0
}

exports.hasrole = hasrole
exports.authorization = async (req, res, next, roles = 0) => {
	const token = req?.query?.token

	if (!token) formatRes(res, null, 401, "utilisateur non authentifié")
	else {
		getUser(token).then(
			(u) => {
				if (!u) formatRes(res, null, 401, "utilisateur non authentifié")
				// else if (roles !== 0 && u.role !== roles)
				else if (roles !== 0 && !hasrole(u.role, roles))
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

exports.role = enumrole
