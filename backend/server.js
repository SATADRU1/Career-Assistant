require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");


connectToDB(); //function calling

app.listen(3000, () => {  //callback function
    console.log("server is running on port 3000");
});
