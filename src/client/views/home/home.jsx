import React, { useEffect } from 'react';
import { useAuth } from '../../controllers/use-auth';
import { Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';



function Home() {

  useEffect(() => {
    document.title = 'Home';
  });

  const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/users" {...props} role={undefined} />
  ));

  const auth = useAuth();
  return (
    <div className="homeDiv">
      <Paper>
        <Typography variant="h3">Welcome to FullStackPOS {auth.user.name}</Typography>
        <Button variant="contained" component={RouterLink} to="/tables">
          Tables
        </Button>
      </Paper>
    </div>
  );
}

export default Home;
