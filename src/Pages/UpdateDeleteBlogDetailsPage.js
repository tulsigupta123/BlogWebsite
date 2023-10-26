import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import {useParams,useNavigate} from 'react-router-dom'
import Header from '../components/HeaderAndFooter/Header.js'

const UpdateDeleteBlogDetailsPage = () => {
    const [blog,setBlog] = useState({})
    const navigate = useNavigate()
    const id = useParams().id
    const [inputs,setInputs] = useState({})

    // Getting Blog Details-
    const getBlogDetails = async() => {
     try{
     const {data} = await axios.get(`http://localhost:5001/api/v1/blog/get-blog/${id}`)
     if(data?.success){
      setBlog(data?.singleBlog);
      setInputs({
        title:data?.singleBlog.title,
    description:data?.singleBlog.description,
    image:data?.singleBlog.image
      })
     }
     }catch(error){
     console.log(error);
     }
    }

    useEffect(()=>{
      getBlogDetails()
    },[id])

    const handleChange =(e) => {
      setInputs(prevState=>({
      ...prevState,
      [e.target.name] : e.target.value
      }))
       }
       const handleSubmit = async(e) => {
          e.preventDefault();
          try{
      const {data} = await axios.put(`http://localhost:5001/api/v1/blog/update-blog/${id}`,{
          title:inputs.title,
          description:inputs.description,
          image:inputs.image,
          user:id
      })
      if(data?.success){
      toast.success("Blog Updated Successfully")
      navigate('/my-blogs')
      }
          }catch(error){
      toast.error("Something went wrong")
      console.log(error);
          }
       }
    console.log(blog);
  return (
    <>
    <Header/>
    <div className="createBlog">
    <form onSubmit={handleSubmit}>
        <div className="blogQuote">"<span>  The Update:</span> A Symphony of Progress "<br />
        </div>
    <h2>Update Blog</h2>
        <label>Title</label>
        <input type="text" value={inputs.title} name="title" placeholder="Add a catchy title" onChange={handleChange} required />
        <label>Description</label>
        <input type="text" value={inputs.description} onChange={handleChange}  name="description" placeholder="Tell your story..."  required />
        <label>Image URL</label>
        <input type="text" value={inputs.image} onChange={handleChange} name="image" placeholder="" required />
        <button>Update and Publish</button>
    </form>
    </div>
    </>
  )
}

export default UpdateDeleteBlogDetailsPage