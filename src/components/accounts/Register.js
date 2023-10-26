import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import '../../App.css'
import axios from 'axios'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
    name:"",
    email:"",
    password:""
  })
  // Handle input changes-
  const handleChange = (e) =>{
    setInputs((previousState)=>({
      ...previousState,
      [e.target.name]:e.target.value
    }))
  }

  // Handle form submission-
  const handleSubmit = async(e) =>{
   e.preventDefault();
   try {
    const {data} = await axios.post('http://localhost:5001/api/v1/user/register',{
      username:inputs.name,
      email:inputs.email,
      password:inputs.password
    })
    if(data?.success){
 toast.success("User Registered Successfully")
 navigate("/login")
    }
   } catch (error) {
    console.log(error);
    toast.error("Something went wrong")
   }
   
  }

  return (
    <>
    <div className="registerPage">
      <div className="blogImage"><Link to="/"><img src="https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png" alt="blog_image" align="center" height="50px"/></Link></div>
      <div className="register-form">
      <form onSubmit = {handleSubmit}>
      <h2>Create Account</h2>
      <label>Your name</label>
      <input type="text" placeholder="First and last name" name="name" value = {inputs.name} onChange={handleChange} required  />
      <label>Email</label>
      <input type="email"  name="email" value = {inputs.email} onChange={handleChange} required/>
      <label>Password</label>
      <input type="password"  name="password" value = {inputs.password} onChange={handleChange} required/>
      <button>Continue</button>
      <span className="register-link"> <Link to="/login">ALREADY REGISTERED? PLEASE LOGIN </Link></span>
      </form>
      </div>
     
    </div>
    </>
  )
}

export default Register