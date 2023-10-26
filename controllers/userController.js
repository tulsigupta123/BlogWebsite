import userModel from '../modelSchema/userModel.js'
import bcrypt from 'bcrypt'

export const getAllUsers = async(req,res) => {
try{
const users = await userModel.find({})
return res.status(200).send({
    userCount:users.length,
    success:true,
    message:"All user's details",
    users,
})
}catch(error){
    console.log(error);
    return res.status(500).send({
        success:false,
        message:"Error in getting all users details",
        error,
    })
}
}

// Register controller-
export const registerController = async(req,res) => {
try{
const{username,email,password,blogs} = req.body
// Validations-
if(!username || !email || !password){
   return res.status(400).send({
        success:false,
        message:"Please fill all the fields"
    })
}
// Existing user-
const existingUser = await userModel.findOne({email})
if(existingUser){
    return res.status(400).send({
        success:false,
        message:"Already Registered. Please login"
    })
}
const hashedPassword = await bcrypt.hash(password,10)

// Saving New User's Details-
const user = new userModel({username,email,password:hashedPassword,blogs}).save();
return res.status(201).send({
    success:true,
    message:"New user created successfully",
    user,
})


}catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in register controller",
        error,
    })
}
}

// Login Controller-
export const loginController = async(req,res) => {
try{
const{email,password,blogs} = req.body;
// Validation-
if(!email || !password){
    return res.status(400).send({
        success:false,
        message:"Please fill all details",
    })
}
// Comparing username-
const user = await userModel.findOne({email})
if(!user){
    return res.status(400).send({
        success:false,
        message:"This user is not registered."
    })
}
// Comparing password-
const passwordMatching = await bcrypt.compare(password,user.password)
if(!passwordMatching){
return res.status(400).send({
    success:false,
    message:"Invalid user details"
})
}
return res.status(200).send({
    success:true,
    message:"Login Successfully",
    user
})
}catch(error){
    console.log(error);
    return res.status(500).send({
    success:false,
    message:"Error in login controller",
    error,
    })
}

}

