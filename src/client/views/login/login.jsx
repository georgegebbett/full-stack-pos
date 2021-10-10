import React, { useEffect, useState } from 'react';
import './login.css';
import { TextField, Card, Button } from '@mui/material';
import ErrorToast from './error-message';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../controllers/use-auth';

function Login() {

  useEffect(() => {
    document.title = 'Login';
  });

  const auth = useAuth();
  const history = useHistory();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [bannerOpen, setBannerOpen] = useState(false);

  const closeBanner = () => {
    setBannerOpen(false);
  };

  const login = () => {
    auth.realSignin(username, password, () => {
      console.log('Login: ', auth.user);
      history.push('/home');
    }, () => {
      setBannerOpen(true);
    });
  };


  return (
    <div className="homeDiv">
      <ErrorToast open={bannerOpen} handleClose={closeBanner} />
      <Card id="loginForm" variant="outlined">
        <TextField id="usernameField" label="Username" variant="outlined" onChange={event => setUsername(event.target.value)} />
        <TextField id="passwordField" label="Password" variant="outlined" type="password" onChange={event => setPassword(event.target.value)} />
        <Button className="loginButton" variant="contained" color="primary" onClick={login}>Login</Button>
      </Card>
    </div>
  );
}

export default Login;
