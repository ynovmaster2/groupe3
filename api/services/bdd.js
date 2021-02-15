const mongoose = require("mongoose")

mongoose.set("debug", true)

const dbconfig = {
	host: process.env.CONFIG_MONGODB_HOST,
	port: process.env.CONFIG_MONGODB_POST,
	user: process.env.CONFIG_MONGODB_USERNAME,
	pass: process.env.CONFIG_MONGODB_PASSWORD,
	dbname: process.env.CONFIG_MONGODB_NAME ?? "db",
}

const url = `mongodb://${dbconfig.user}:${dbconfig.pass}@${dbconfig.host}:${dbconfig.port}/${dbconfig.dbname}?authSource=admin`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// eslint-disable-next-line no-console
db.on("error", (e) => console.error("MongoDB error:", e))
// eslint-disable-next-line no-console
db.once("open", () => console.log("MongoDB connected!"))

// db.close()

module.exports = db
