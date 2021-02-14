const express = require("express")
const {
	create,
	findAll,
	findOne,
	update,
	// deleteOragnismefix,
} = require("../controller/organisme.controller")

const { authorization, role } = require("../utils/authorization")

const router = express.Router()

router.get(
	"/:id",
	(req, res, next) => authorization(req, res, next, role.secretaire),
	findOne
)

router.get(
	"",
	(req, res, next) => authorization(req, res, next, role.secretaire),
	findAll
)

router.post(
	"",
	(req, res, next) => authorization(req, res, next, role.secretaire),
	create
)

router.put(
	"/:id",
	(req, res, next) => authorization(req, res, next, role.secretaire),
	update
)

// function name deleteOragnisme make error
// router.delete(
// 	"/:id",
// 	(req, res, next) => authorization(req, res, next, role.secretaire),
// 	deleteOragnismefix
// )

module.exports = router
