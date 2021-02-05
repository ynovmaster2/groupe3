const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		role: {
			type: String,
			enum: [
				"user",
				"admin",
				"directeur",
				"chef",
				"comptable",
				"secretaire",
				"collaborateur",
			],
			default: "user",
			required: true,
		},
		tel: String,
	},
	{
		timestamps: true,
	}
)

module.exports = {
	schema: UserSchema,
	model: mongoose.model("user", UserSchema),
}
