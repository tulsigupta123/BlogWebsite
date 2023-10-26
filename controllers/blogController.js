import blogModel from '../modelSchema/blogModel.js'
import userModel from '../modelSchema/userModel.js'
import mongoose from "mongoose";

// Get all blogs-
 export const getAllBlogsController = async(req,res)=>{
    try{
    const blogs = await blogModel.find({}).populate("user");
    if(!blogs){
      return res.status(200).send({
         success:false,
         message:"No blog found"
      })
   }
      return res.status(200).send({
         success:true,
         blogCount:blogs.length,
         message:"All blogs list",
         blogs
      })
    }catch(error){
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"Error in getting all blogs",
      error
    })
    }
 }

//  Get single blogs-
 export const getSingleBlogController = async(req,res)=>{
    try{
      const {id} = req.params;
    const singleBlog = await blogModel.findById(id)
    if(!singleBlog){
      return res.status(400).send({
         success:true,
         message:"No blog with this id"
      })
    }
    return res.status(200).send({
      success:true,
      message:"Single blog found with this id",
      singleBlog
    })
    }catch(error){
      console.log(error);
    return res.status(500).send({
      success:false,
      message:"Error in getting single blog",
      error
    })
    }
 }

//  Getting particular user's blog-
export const userBlogController = async(req,res)=>{
   try{
    const userBlog = await userModel.findById(req.params.id).populate("blogs")
    if(!userBlog){
   return res.status(201).send({
success:true,
message:"No blog found with this id"
   }
   )
    }
    return res.status(200).send({
      success:true,
      userBlogCount:userBlog.count,
      message:"User's blog list",
      userBlog
    })
   }catch(error){
      console.log(error);
      res.status(500).send({
         success:false,
         message:"Can't get user's blog"
      })
   }
}


//  Create blog-
 export const createBlogController = async(req,res)=>{
try{
  const {title,description,image,user} = req.body;
//   Validation-
if(!title || !description || !image || !user){
   return res.status(400).send({
      success:false,
      message:"Please provide all details"
   })
}
const existingUser = await userModel.findById(user)

if(!existingUser){
   return res.status(404).send({
      success:false,
      message:"Unable to find user"
   })
}

// Validation for authorization throgh sessions-
const newBlog = new blogModel({title,description,image,user});
const session = await mongoose.startSession()
session.startTransaction()
await newBlog.save({session})
existingUser.blogs.push(newBlog)
await existingUser.save({session})
await session.commitTransaction()
await newBlog.save();
return res.status(200).send({
   success:true,
   message:"Blog Created Successfully",
   newBlog,
})
}catch(error){
   console.log(error);
   res.status(500).send({
      success:false,
      message:"Error while creating new blog"
   })
}
 }

//  Update blog-
 export const updateBlogController = async(req,res)=>{
  try{
const {id} = req.params;
const {title,description,image} = req.body;
const updatedBlog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
   return res.status(200).send({
      success:true,
      message:"Blog updated successfully",
      updatedBlog
   })
  }catch(error){
   console.log(error);
   res.status(500).send({
      success:false,
      message:"Error while updating blog",
      error
   })
  }
 }

//  Delete blog-
 export const deleteBlogController = async(req,res)=>{
    try{
   const {id} = req.params;
   const deleteBlog = await blogModel.findByIdAndDelete(id).populate("user")
  await deleteBlog.user.blogs.pull(deleteBlog);
  await deleteBlog.user.save();
   return res.status(200).send({
      success:true,
      message:"Blog deleted successfully"
   })
    }catch(error){
      console.log(error);
      return res.status(500).send({
         success:false,
         message:"Error in deleting blog",
         error
      })
    }
 }