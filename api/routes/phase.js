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

router.get("", (req, res, next) => authorization(req, res, next), findAll)

router.get("/:id", (req, res, next) => authorization(req, res, next), findOne)

router.post("", (req, res, next) => authorization(req, res, next), create)

router.put("/:id", (req, res, next) => authorization(req, res, next), update)

router.delete(
	"/:id",
	(req, res, next) => authorization(req, res, next),
	deletePhase
)

module.exports = router
