import mongoose from 'mongoose'

const connectDb = async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Connecting with mongodb');
    }catch(error){
        console.log('Error in connection Mongodb:', error);
    }
}
export default connectDb