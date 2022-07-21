import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../../pages/auth';

const AuthDialog = ({ open, handleClose }) => {
    const [isLogIn, setIsLogIn] = useState(true)

    const LogInForm = ({ handleClose }) => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const { logIn, signUn, signOut } = useAuth();
  
        function onSubmit(e) {
          e.preventDefault()
          logIn({ email, password })
        }

        return (
          <form onSubmit={onSubmit}>
            <TextField
              label="Email"
              variant="filled"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div>
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                LogIn
              </Button>
            </div>
            <a onClick={() => {setIsLogIn(!isLogIn)}}>  Sign Up Form </a>
          </form>
        );
      };

    const SignUpForm = ({ handleClose }) => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const { signIn, signUp } = useAuth();

      function onSubmit(e) {
        e.preventDefault()
        signUp({ name, email, password })
      }
    
      return (
        <form onSubmit={onSubmit}>
          <TextField
            label="Name"
            variant="filled"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
    
          <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
          </div>
          <a onClick={() => {setIsLogIn(!isLogIn)}} > Log In in my account </a>
        </form>
      );
    };
      
  return (
    <Dialog open={open} onClose={handleClose}>
    {isLogIn ? <LogInForm handleClose={handleClose}/> : <SignUpForm handleClose={handleClose} />}
    </Dialog>
  );
};

export default AuthDialog;