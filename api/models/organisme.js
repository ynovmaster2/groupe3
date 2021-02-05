const mongoose = require("mongoose")

const OragnismeSchema = mongoose.Schema(
	{
		nom: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)

module.exports = {
	schema: OragnismeSchema,
	model: mongoose.model("oragnisme", OragnismeSchema),
}
