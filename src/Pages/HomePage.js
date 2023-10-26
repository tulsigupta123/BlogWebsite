import React from 'react'
import Header from '../components/HeaderAndFooter/Header.js'
import BlogPage from './BlogPage.js'
// import SearchComponent from '../components/SearchBar/SearchComponent.js'

const HomePage = () => {
  // const[blogs,setBlogs] = useState(blogList);
  // const[searchKey,setSearchKey] = useState("")
  return (
    <>
    <Header/>
   <BlogPage/>
    </>
  )
}

export default HomePage