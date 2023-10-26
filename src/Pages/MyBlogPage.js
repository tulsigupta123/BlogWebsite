import React,{useState,useEffect} from 'react'
import '../../src/index.css'
import axios from 'axios'
import BlogCard from '../components/BlogCardComponent.js'
import Header from '../components/HeaderAndFooter/Header.js'
const MyBlogPage = () => {
    const[blogs,setBlogs] = useState([])
    const getUserBlog = async() => {
        try{
         const id = localStorage.getItem("userId")
         const {data} = await axios.get(`http://localhost:5001/api/v1/blog/user-blog/${id}`)
         if(data?.success){
            setBlogs(data?.userBlog.blogs)
         }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getUserBlog()
    },[])
  return (
  <div>
    <Header/>
    {(blogs && blogs.length > 0) ? (
      blogs.map((blog) => (
        <BlogCard
          id={blog._id}
          isUser={true}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          username={blog.user.username}
          time={blog.createdAt}
        />
      ))
    ) : (
      <div className="no-blog-page"><h3>Tell the world about yourself</h3>
      <span className="no-blog-content">Here’s where you can share more about yourself: your history, work experience,<br /> accomplishments, interests, dreams, and more. You can even add images and <br />use  rich text to personalize your bio.</span></div>
    )}
  </div>
);
};


export default MyBlogPage