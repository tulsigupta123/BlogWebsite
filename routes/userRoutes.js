import express from 'express'
const router = express.Router();
import {getAllUsers,registerController,loginController} from '../controllers/userController.js'

// Routes-
// Get All Users-
router.get('/all-users',getAllUsers)

// Create/Register User-
router.post('/register',registerController)

// Login User-
router.post('/login',loginController)

export default router;