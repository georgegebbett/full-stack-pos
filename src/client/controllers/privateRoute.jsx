import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { useAuth } from './use-auth';

export default function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => (auth.user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location }
          }}
        />
      ))
      }
    />
  );
}
