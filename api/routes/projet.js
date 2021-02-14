const express = require("express")
const {
	create,
	findAll,
	findOne,
	update,
	// deleteProjet,
} = require("../controller/projet.controller")

const { authorization, role } = require("../utils/authorization")

// eslint-disable-next-line no-bitwise
const roles = role.directeur | role.chef /* self */ | role.secretaire

const router = express.Router()

router.get(
	"",
	(req, res, next) => authorization(req, res, next, roles),
	findAll
)

router.get(
	"/:id",
	(req, res, next) => authorization(req, res, next, roles),
	findOne
)

router.post(
	"",
	(req, res, next) => authorization(req, res, next, roles),
	create
)

router.put(
	"/:id",
	(req, res, next) => authorization(req, res, next, roles),
	update
)

// router.delete(
// 	"/:id",
// 	(req, res, next) => authorization(req, res, next, role.directeur),
// 	deleteProjet
// )

module.exports = router
