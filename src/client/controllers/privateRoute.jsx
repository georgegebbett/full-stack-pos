import { Redirect, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './use-auth';

export default function PrivateRoute({ children, permission, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={
        ({ location }) => (
          (
            auth.user && (auth.user.permissions.includes(permission) || permission === undefined)
          )
            ? (
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
