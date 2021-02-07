const mongoose = require("mongoose")
// const graphql = require("graphql")
// const createType = require("mongoose-schema-to-graphql").

mongoose.set("debug", true)

const host = "mongo"
const port = "27017"
const user = "root"
const pass = "example"
const dbname = "bob"
// const url = `mongodb://${user}:${pass}@${host}:${port}` // -> test
const url = `mongodb://${user}:${pass}@${host}:${port}/${dbname}?authSource=admin`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// eslint-disable-next-line no-console
db.on("error", (e) => console.error("MongoDB error:", e))
// eslint-disable-next-line no-console
db.once("open", () => console.log("MongoDB connected!"))

// db.close()

module.exports = db
