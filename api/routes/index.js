const express = require("express")

const router = express.Router()

/* GET home page. */
router.get("/", (req, res, next) => {
	res.status(200).send("ok\n")
})

router.get("/user", (req, res, next) => {
	res.status(200).json([{"success":true,
	"code":200,
	"message":"Ok",
	"data": [{id: "toto",email:"toto@toto.fr",role:"chef",tel:"09090909"}]	
	}])
})

router.post("/user", (req, res, next) => {
	res.status(201).json(req.body)
})

router.put("/user", (req, res, next) => {
	res.status(201).json(req.body)
})

router.delete("/user", (req, res, next) => {
	res.status(200).json(req.body)
})

module.exports = router
