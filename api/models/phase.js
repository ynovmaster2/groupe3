const mongoose = require("mongoose")

const PhaseSchema = mongoose.Schema(
	{
		code: String,
		libelle: String,
		description: String,
		PourcentageMontant: Number,
		Paiement: Boolean,
		facturation: Boolean,
		realisation: Boolean,
		documentation: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "document",
				required: true,
			},
		],
		livrable: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "document",
				required: true,
			},
		],
		employes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "user",
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
)

module.exports = {
	schema: PhaseSchema,
	model: mongoose.model("phase", PhaseSchema),
}
