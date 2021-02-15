const express = require("express")
const {
	create,
	findAll,
	findOne,
	update,
	deletePhase,
} = require("../controller/phase.controller")

const { authorization } = require("../utils/authorization")

const router = express.Router()

router.get(
	"",
	// eslint-disable-next-line no-bitwise
	(req, res, next) => authorization(req, res, next),
	findAll
)

router.get(
	"/:id",
	// eslint-disable-next-line no-bitwise
	(req, res, next) => authorization(req, res, next),
	findOne
)

router.post("", (req, res, next) => authorization(req, res, next), create)

router.put(
	"/:id",
	// eslint-disable-next-line no-bitwise
	(req, res, next) => authorization(req, res, next), // comptable(facturation)
	update
)

router.delete(
	"/:id",
	(req, res, next) => authorization(req, res, next),
	deletePhase
)

module.exports = router
