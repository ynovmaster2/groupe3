const express = require("express")
const {
	create,
	findAll,
	findOne,
	update,
	// deleteOragnisme,
} = require("../controller/organisme.controller")

const { authorization, role } = require("../utils/authorization")

// eslint-disable-next-line no-bitwise
const roleSecretaireOrDirecteur = role.secretaire | role.directeur

const router = express.Router()

router.get("/:id", (req, res, next) => authorization(req, res, next), findOne)

router.get("", (req, res, next) => authorization(req, res, next), findAll)

router.post(
	"",
	(req, res, next) => authorization(req, res, next, roleSecretaireOrDirecteur),
	create
)

router.put(
	"/:id",
	(req, res, next) => authorization(req, res, next, roleSecretaireOrDirecteur),
	update
)

// router.delete(
// 	"/:id",
// 	(req, res, next) => authorization(req, res, next, role.directeur),
// 	deleteOragnisme
// )

module.exports = router
