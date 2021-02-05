const express = require("express")

const router = express.Router()


router.get("", (req, res, next) => {
	res.status(200).json([{"success":true,
	"code":200,
	"message":"Ok",
	"data": [{nom: "Grand groupe", createdAt:"1612606573", updatedAt:"1612606573"}],
	}])
})

router.post("", (req, res, next) => {
	res.status(201).json(req.body)
})

router.put("", (req, res, next) => {
	res.status(201).json(req.body)
})

router.delete("", (req, res, next) => {
	res.status(200).json(req.body)
})


module.exports = router