const express = require ("express")
const cookieParser = require("cookie-parser")

const app = express() // server initiasition 


// require all the route are here
const authRouter = require("./routes/auth.routes");

app.use(express.json()) // middleware ..which help to read from request.body
app.use(cookieParser()) // middleware to parse cookies

//use all the routes here 
app.use("/api/auth", authRouter);


// api routes
module.exports = app