const express = require("express")
const { create } = require("../controller/document.controller")

const router = express.Router()

router.get("", (req, res) => {
	res.status(200).json([
		{
			success: true,
			code: 200,
			message: "Ok",
			data: [
				{
					nom: "projet",
					path: "https://projet.com",
					createdAt: "1612606573",
					updatedAt: "1612606573",
				},
			],
		},
	])
})

router.post("", create)

router.put("", (req, res) => {
	res.status(201).json(req.body)
})

router.delete("", (req, res) => {
	res.status(200).json(req.body)
})

module.exports = router
