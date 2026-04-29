const express = require ("express")

const app = express() // server initiasition 


// require all the route are here
const authRouter = require("./routes/auth.routes");

app.use(express.json()) // middleware ..which help to read from request.body


//use all the routes here 
app.use("/api/auth", authRouter);


// api routes
module.exports = app