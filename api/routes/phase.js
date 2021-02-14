const express = require("express")
const {
	create,
	findAll,
	findOne,
	update,
	deletePhase,
} = require("../controller/phase.controller")

const { authorization, role } = require("../utils/authorization")

const router = express.Router()

router.get(
	"",
	// eslint-disable-next-line no-bitwise
	(req, res, next) => authorization(req, res, next, role.chef | role.comptable),
	findAll
)

router.get(
	"/:id",
	// eslint-disable-next-line no-bitwise
	(req, res, next) => authorization(req, res, next, role.chef | role.comptable),
	findOne
)

router.post(
	"",
	(req, res, next) => authorization(req, res, next, role.chef),
	create
)

router.put(
	"/:id",
	// eslint-disable-next-line no-bitwise
	(req, res, next) => authorization(req, res, next, role.chef | role.comptable), // comptable(facturation)
	update
)

router.delete(
	"/:id",
	(req, res, next) => authorization(req, res, next, role.chef),
	deletePhase
)

module.exports = router
