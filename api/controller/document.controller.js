const Document = require("../models/document").model

exports.create = (req, res) => {
	const document = new Document({
		nom: req.body.nom,
		path: req.body.path,
	})

	document.save().then(
		(data) => {
			if (data.errors) res.status(400).send(data.errors)
			else res.send(data)
		},
		(e) => res.status(500).send(e)
	)
}
