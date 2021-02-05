const express = require("express")

const router = express.Router()


router.get("", (req, res, next) => {
	res.status(200).json([{"success":true,
	"code":200,
	"message":"Ok",
	"data": [{
		code: "9865433", libelle:"UBUYGYGY",description: "test", PourcentageMontant:"10%", Paiement: true, facturation: true, realisation: true,
		documentation:  {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
		livrable: {nom:"projet",path:"https://projet.com",createdAt:"1612606573",updatedAt:"1612606573"},
		employes: [
			{id: "tyson",email:"tyson@tyson.fr",role:"user",tel:"66789000000",createdAt:"1612606573",updatedAt:"1612606573"},
			],
		createdAt:"1612606573",updatedAt:"1612606573"
		}],
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