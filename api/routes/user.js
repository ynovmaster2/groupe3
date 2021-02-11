const express = require("express")
const { create } = require("../controller/user.controller")
const { findAll } = require("../controller/user.controller")
const { findOne } = require("../controller/user.controller")
const { update } = require("../controller/user.controller")
const { deleteUser } = require("../controller/user.controller")

const router = express.Router()

/* GET home page. */
// router.get("/", (req, res, next) => {
// 	res.status(200).send("ok\n")
// })

router.get("", findAll)

router.get("/:id", findOne)

router.post("", create)

router.put("/:id", update)

router.delete("/:id", deleteUser)

module.exports = router