import React from 'react';
import {useNavigate} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../index.css'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function BlogCard({title,description,image,username,time,id,isUser}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit-blog-details/${id}`)
  }
 
  const handleDelete = async() => {
   try{
     if(window.confirm("Do you really want to Delete?\nDeletion can not be reverted if you confirm!")=== true){
      const {data} = await axios.delete(`http://localhost:5001/api/v1/blog/delete-blog/${id}`)
      if(data?.success){
      toast.success("Blog Deleted Successfully")
      window.location.reload()
      navigate('/my-blogs')
    }
     }
   }catch(error){
    console.log(error);
   }
  }
  return (
    <div className="blogCard">
    <Card sx={{ width: "50%",
                margin:"auto",
                mt:"10px",
                padding:"10px",
                boxShadow:"5px 5px 10px #ccc"
              
              }}>
      {isUser && (
        <div className="edit-delete">
          <span className="edit" onClick={handleEdit}><EditIcon/></span>
          <span className="delete" onClick={handleDelete}><DeleteIcon/></span>
        </div>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
           {username}
          </Avatar>
        }
      subheader={time}
      />
       <CardContent sx={{fontSize:"30px",fontWeight:"600"}}>
        {title}
        </CardContent>
      <CardMedia className="blogMainImage"
        component="img"
        height = "400px"
        image={image}
        alt="image"
      />
      <CardContent>
        <Typography variant="body2" color="black">
         {description}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}

