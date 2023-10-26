import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'

// Creating app-
const app = express();

// Configure environment variable-
dotenv.config();

// Connecting database-
connectDb();

// Port-
const PORT = process.env.PORT || 8080
// Middlewares-
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes-
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/blog",blogRoutes)

app.listen(PORT,()=>{
    console.log("Server is listening at port 5001 ");
});