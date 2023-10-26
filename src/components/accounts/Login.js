import React,{useState} from 'react'
import {useNavigate,Link } from 'react-router-dom'
import '../../App.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from  'react-redux'
import {authActions} from '../../redux/store.js'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Managing state change-
  const [inputs,setInputs] = useState({
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
    const {data} = await axios.post('http://localhost:5001/api/v1/user/login',{
      email:inputs.email,
      password:inputs.password
    })
    if(data.success){
      localStorage.setItem("userId", data.user._id);
      dispatch(authActions.login());
 toast.success("User Login Successfully")
 navigate("/")
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
      <div className="register-form login-form">
      <form onSubmit = {handleSubmit}>
      <h2>Login</h2>
      <label>Email</label>
      <input type="email"  name="email" value = {inputs.email} onChange={handleChange} required/>
      <label>Password</label>
      <input type="password"  name="password" value = {inputs.password} onChange={handleChange} required/>
      <button>Login</button>
      <span className="login-line"><hr />New to Blog?</span>
      <span className=" login-nav-button"> <button onClick = {()=>navigate("/register")}>CREATE YOUR ACCOUNT</button></span>
      </form>
      </div>
    </div>
   
    </>
  )
}

export default Login