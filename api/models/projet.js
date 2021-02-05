const mongoose = require("mongoose")

const ProjetSchema = mongoose.Schema(
	{
		nom: { type: String, required: true },
		code: String,
		description: String,
		montant: Number,
		chef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		equipe: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "user",
				required: true,
			},
		],
		documentation: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "document",
				required: true,
			},
		],
		organisme: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "oragnisme",
			required: true,
		},
		phase: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "phase",
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
)

module.exports = {
	schema: ProjetSchema,
	model: mongoose.model("projet", ProjetSchema),
}
