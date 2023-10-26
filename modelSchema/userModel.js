import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
username:{
    type:String,
    required:[true,"Username is mendatory"]
},
email:{
    type:String,
    required:[true,"Email is mendatory"]
},
password:{
    type:String,
    required:[true,"Password field can't be empty"]
},
blogs:[
    {
    type:mongoose.Types.ObjectId,
    ref:"Blog"
}
]
},{timestamps:true})

const userModel = mongoose.model("User",userSchema)
export default userModel