const mongoose = require("mongoose");

// create the connect function 
async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DataBase")
        
    } catch (error) {
        console.log(error)
    } 
}
module.exports = connectToDB;