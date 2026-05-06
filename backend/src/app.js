const express = require ("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express() // server initiasition 


// require all the route are here
const authRouter = require("./routes/auth.routes");

app.use(express.json()) // middleware ..which help to read from request.body
app.use(cookieParser()) // middleware to parse cookies
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


//use all the routes here 
app.use("/api/auth", authRouter);


// api routes
module.exports = app