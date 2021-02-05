const mongoose = require("mongoose")

const documentSchema = mongoose.Schema(
	{
		nom: { type: String, required: true },
		path: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)

module.exports = {
	schema: documentSchema,
	model: mongoose.model("document", documentSchema),
}
