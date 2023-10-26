import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/HeaderAndFooter/Header.js'

const CreateBlogPage = () => {
 const id = localStorage.getItem('userId')
 const navigate = useNavigate();
 const [inputs,setInputs] = useState({
    title:"",
    description:"",
    image:""
 })

 const handleChange =(e) => {
setInputs(prevState=>({
...prevState,
[e.target.name] : e.target.value
}))
 }
 const handleSubmit = async(e) => {
    e.preventDefault();
    try{
const {data} = await axios.post('http://localhost:5001/api/v1/blog/create-blog',{
    title:inputs.title,
    description:inputs.description,
    image:inputs.image,
    user:id
})
if(data?.success){
toast.success("Blog Created Successfully")
navigate('/my-blogs')
}
    }catch(error){
toast.error("Something went wrong")
console.log(error);
    }
 }
  return (
    <>
    <Header/>
    <div className="createBlog">
    <form onSubmit={handleSubmit}>
        <div className="blogQuote">"<span> Your Blog </span>  is Your Unedited Version of Yourself "<br />
        </div>
    <h2>Create A Blog</h2>
        <label>Title</label>
        <input type="text" value={inputs.title} name="title" placeholder="Add a catchy title" onChange={handleChange} required />
        <label>Description</label>
        <input type="text" value={inputs.description} onChange={handleChange}  name="description" placeholder="Tell your story..."  required />
        <label>Image URL</label>
        <input type="text" value={inputs.image} onChange={handleChange} name="image" placeholder="" required />
        <button>Publish</button>
    </form>
    </div>
   
    </>
  )
}

export default CreateBlogPage