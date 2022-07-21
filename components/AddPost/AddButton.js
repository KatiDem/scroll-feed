import { useState } from 'react'
import PostForm from './PostForm'
import Button from '@mui/material/Button';

const AddButton = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Post
        </Button>
        <PostForm open={open} handleClose={handleClose} />
      </div>
    );
}

export default AddButton;