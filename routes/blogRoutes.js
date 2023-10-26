import express from 'express'
import {getAllBlogsController,getSingleBlogController,createBlogController,updateBlogController,deleteBlogController,userBlogController} from '../controllers/blogController.js'
const router = express.Router();

// Routes-
// Get all blogs(GET)-
router.get('/all-blogs',getAllBlogsController)

// Get single blog(GET)-
router.get('/get-blog/:id',getSingleBlogController)

// Get a particular user's blog(GET)-
router.get('/user-blog/:id',userBlogController)

// Create a blog(POST)-
router.post('/create-blog',createBlogController)

// Update a blog(PUT)-
router.put('/update-blog/:id',updateBlogController)

// Delete a blog(DELETE)-
router.delete('/delete-blog/:id',deleteBlogController)

export default router;