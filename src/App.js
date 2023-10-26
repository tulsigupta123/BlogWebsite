import {Route,Routes} from 'react-router-dom'
import Login from './components/accounts/Login.js'
import Register from './components/accounts/Register.js'
import BlogPage from './Pages/BlogPage.js'
import HomePage from './Pages/HomePage.js'
import MyBlogPage from './Pages/MyBlogPage.js'
import CreateBlogPage from './Pages/CreateBlogPage.js'
import UpdateDeleteBlogDetailsPage from './Pages/UpdateDeleteBlogDetailsPage.js'
function App() {
  return (
    <>
    <div className="container">
    <Routes>
    <Route exact path="/" element = {<HomePage/>} />
    <Route path="/login" element = {<Login/>} />
    <Route path = "/register" element = {<Register/>} />
    <Route path="/my-blogs" element = {<MyBlogPage/>} />
    <Route path="/create-blog" element = {<CreateBlogPage/>} />
    <Route path="/edit-blog-details/:id" element = {<UpdateDeleteBlogDetailsPage/>} />
    <Route path = "/get-blog/:id" element = {<BlogPage/>}/>
   </Routes>
   </div>
   </>
  );
}

export default App;
