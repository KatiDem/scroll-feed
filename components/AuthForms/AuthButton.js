
import { useState } from 'react'
import AuthDialog from './AuthDialog'
import Button from '@mui/material/Button';

const AuthButton = () => {
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
        AUTHENFICATE
        </Button>
        <AuthDialog open={open} handleClose={handleClose} />
      </div>
    );
}

export default AuthButton;