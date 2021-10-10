import React, {
  useState, useEffect, useContext, createContext
} from 'react';

const axios = require('axios');

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export function useAuth() {
  return useContext(authContext);
}

function getUserFromId(userId) {
  axios.get(`/api/users/${userId}`)
    .then(response => {
      return response.body.user;
    });
}


// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.

  const signout = cb => fakeAuth.signout(() => {
    setUser(null);
    cb();
  });

  const realSignin = (username, password, cb, failCb) => {
    axios.post('/api/login', {
      username,
      password
    })
      .then((response) => {
        setUser({
          name: response.data.name,
          user: response.data.user,
          roles: response.data.roles,
          token: response.data.token
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
        failCb();
      });
  };

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('userId', user.token);
    } else {
      sessionStorage.removeItem('userId');
    }
  });

  // Return the user object and auth methods
  return {
    user,
    signout,
    realSignin
  };
}
