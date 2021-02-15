const express = require("express")
const {
	// create,
	findAll,
	findOne,
	update,
	deleteUser,
} = require("../controller/user.controller")

const { authorization, role } = require("../utils/authorization")

const router = express.Router()

/* GET home page. */
// router.get("/", (req, res, next) => {
// 	res.status(200).send("ok\n")
// })

router.get("", findAll)

router.get("/:id", findOne)

// router.post(
// 	"",
// 	(req, res, next) => authorization(req, res, next, role.admin),
// 	create
// )

router.put(
	"/:id",
	(req, res, next) => authorization(req, res, next, role.admin),
	update
)

router.delete(
	"/:id",
	(req, res, next) => authorization(req, res, next, role.admin),
	deleteUser
)

module.exports = router
