import React from 'react';
import { Typography } from '@mui/material';
import { useAuth } from '../../controllers/use-auth';

function About() {
  const auth = useAuth();
  return (
    <div className="homeDiv">
      <Typography variant="h2">
        FullStackPos - (c) 2021 George Gebbett
      </Typography>
      <p>
        Authenticated user:
        {auth.user}
      </p>
    </div>
  );
}

export default About;
