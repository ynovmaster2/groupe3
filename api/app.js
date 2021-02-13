const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")

const indexRouter = require("./routes/index")
const userRouter = require("./routes/user")
const projetRouter = require("./routes/projet")
const phaseRouter = require("./routes/phase")
const documentRouter = require("./routes/document")
const organismeRouter = require("./routes/organisme")

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())

app.use("/", indexRouter)
app.use("/user", userRouter)
app.use("/projet", projetRouter)
app.use("/phase", phaseRouter)
app.use("/document", documentRouter)
app.use("/organisme", organismeRouter)

module.exports = app
