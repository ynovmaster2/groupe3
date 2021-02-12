const express = require("express")
const {
	create,
	findAll,
	findOne,
	update,
	deleteProjet,
} = require("../controller/projet.controller")

const router = express.Router()

router.get("", findAll)

router.get("/:id", findOne)

router.post("", create)

router.put("/:id", update)

router.delete("/:id", deleteProjet)

module.exports = router
