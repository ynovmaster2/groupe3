const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
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
		oauth: {
			type: Map,
			of: { _id: false, id: String }, // oauth.github -> github user
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
