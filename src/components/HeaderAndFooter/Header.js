import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NavLink,useNavigate,Link} from 'react-router-dom'
import SearchComponent from '../SearchBar/SearchComponent.js'
import {useSelector,useDispatch} from 'react-redux'
import {authActions} from '../../redux/store.js'

const Header = () => {
  // const[searchKey,setSearchKey] = useState("")
  // // Search Function-
  // const handleSearchKey = () =>{

  // }

  const navigate = useNavigate();
  // Creating global state for accessing data from store-
  let isLogin = useSelector((state)=> state.isLogin);
  isLogin = isLogin || localStorage.getItem('userId')
  const dispatch = useDispatch();
  console.log("initial state: ",isLogin);

  // Logout function-
  const handleLogout = () => {
  try{
  dispatch(authActions.logout())
 toast.success("Logout Successfully")
 navigate('/login')
 localStorage.clear();
  }catch(error){
    console.log(error);
  }
  }
  return (
    <>
    <nav className="header">
    <div className="blogImage"><Link to="/"><img src="https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png" alt="blog_image" align="center" height="50px"/></Link></div>
    <div className="searchBar">
      <SearchComponent/>
    </div>
   <ul>
    {isLogin && (
      <>
      <NavLink  className="active-class" to="/my-blogs"> <li>My Blogs</li></NavLink>
      <NavLink  className="active-class" to="/create-blog"> <li>Create Blog</li></NavLink>
      <NavLink className="active-class" to="/login" onClick={handleLogout}><li>Logout</li></NavLink>
      </>
    )}
    {!isLogin && (
      <>
      <NavLink  className="active-class" to="/login"> <li>Login</li></NavLink>
   <NavLink  className="active-class" to="/register"><li>Register</li></NavLink>
      </>
    )}
   
   </ul>
    </nav>
    </>
  )
}

export default Header