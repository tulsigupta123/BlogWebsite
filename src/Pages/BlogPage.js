import React,{useState,useEffect} from 'react'
import BlogCard from '../components/BlogCardComponent.js';
import axios from 'axios'
const BlogPage = () => {
  const[blogs,setBlogs] = useState([])

  // Get Blogs-
  const getAllBlogs = async() =>{
try{
 const {data} = await axios.get('http://localhost:5001/api/v1/blog/all-blogs')
 if(data?.success){
  setBlogs(data?.blogs)
 }
}catch(error){
  console.log(error);
}
  }
  useEffect(()=>{
 getAllBlogs()
  },[])
  return (
    <>
    {blogs && blogs.map((blog)=>(<BlogCard 
    id={blog?._id}
    isUser={localStorage.getItem("userId") === blog?.user?._id}
    title={blog?.title}
    description={blog?.description}
    image={blog?.image}
    username={blog?.user?.username}
    time={blog.createdAt}
    />))}
    </>
  )
}

export default BlogPage