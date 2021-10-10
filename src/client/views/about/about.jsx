import React from 'react';
import { TextField, Card, Button } from '@mui/material';
import { useAuth } from '../../controllers/use-auth';

function About() {
  const auth = useAuth();
  return (
    <div className="homeDiv">
      <p>
        Authenticated user:
        {auth.user}
      </p>
    </div>
  );
}

export default About;
