import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useAuth } from '../../pages/auth';
import {ADD_LINK, PAGINATE} from "../../graphql/queries"
import { useMutation } from '@apollo/client'
import Typography from '@mui/material/Typography';

const PostForm = ({ open, handleClose }) => {
    const { isSignedIn } = useAuth();

    const Form = ({handleClose}) => {

        const [addLink] = useMutation(ADD_LINK, {
            refetchQueries: [PAGINATE],
        });

        const onSubmit = (e) => {
            e.preventDefault();
                addLink({variables: { 
                    description: e.target.description.value, 
                    url: e.target.url.value 
                }})
            } 

        return (
            <form onSubmit={onSubmit}>
                <Typography> Description </Typography>
                <TextField name="description"/>
                <Typography> Link </Typography>
                <TextField name="url"/>
                <Button  onClick={handleClose}>
                Cancel
                </Button>
                <Button variant="contained" type="submit">Submit</Button>
            </form>
        )
    }

    const NotAuth = ({handleClose}) => {
        return (<div handleClose={handleClose}> 
                    <Typography> AUTHENFICATE FIRST </Typography>
                    <Button  onClick={handleClose}>
                    OK
                    </Button>
                </div>)
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            {isSignedIn() && <Form handleClose={handleClose}/> }
            {!isSignedIn() && <NotAuth handleClose={handleClose}/>}
        </Dialog>
      );
}

export default PostForm;
