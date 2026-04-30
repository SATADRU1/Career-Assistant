const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

/**
 * @name registerUserController
 * @routes POST/api/auth/register
 * @description register a new user
 * @access public
 */

async function registerUserController(req, res){  // this is the value of this function
   const { username, email, password } = req.body; // destructure from req.body
   
   if (!username || !email || !password ) { // condition of the 
        return res.status(400).json({ 
        message: "All fields are required" });
   }   

   const isUserAlreadyExits = await userModel.findOne({ 
        $or : [  // this is the condition of the userModel..if the user is already exits on of the following condition (username or email) then this will return true
            {username : username}, 
            {email : email}
        ]  
    });

   if (isUserAlreadyExits) {
    return res.status(400).json({ 
        message: "Account already exists with this email or username!" });
   }    

   const hashedPassword = await bcrypt.hash(password, 10);

   const user = await userModel.create({
    username,
    email,
    password: hashedPassword
   });

   const token = jwt.sign({ id: user._id, username: user.username },
    process.env.JWT_SECRET, { 
    expiresIn: "1d" 
   });

   res.status(201).json({  //201 is used for basically create new resource
    success: true,
    message: "User registered successfully",
    user: {
        _id: user._id,
        username: user.username,
        email: user.email
    }
   });
}


/**
 * @name loginUserController
 * @routes POST/api/auth/login
 * @description login a user
 * @access public
 */

async function loginUserController( req , res) {
    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ 
            message: "Invalid email or password" 
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        return res.status(400).json({ 
            message: "Invalid email or password" 
        });
    }

    const token = jwt.sign({ id: user._id, username: user.username },
        process.env.JWT_SECRET, { 
        expiresIn: "1d" 
    });
    res.cookie("token", token)
    res.status(200).json({ 
        success: true,
        message: "User logged in successfully",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        },
        token
    });
}


/**
 * @name logoutUserController
 * @routes GET/api/auth/logout
 * @description logout a user
 * @access public
 */

async function logoutUserController( req , res) {
    const token = req.cookies.token;
   
    if (token) {
        await tokenBlacklistModel.create({ token });
    }
    
    res.clearCookie("token");
    res.status(200).json({ 
        message: "User logged out successfully"
    });
}


/**
 * @name getMeController
 * @routes GET/api/auth/get-me
 * @description get current logged in user details
 * @access private
 */
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);


    res.status(200).json({ 
        message: "User details retrieved successfully",
        user : {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

module.exports = { registerUserController, loginUserController, logoutUserController, getMeController }; //this is the property of the authController object 