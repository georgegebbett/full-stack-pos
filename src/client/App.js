import React from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import MyAppBar from './views/navBar/appBar';
import Login from './views/login/login';
import Users from './views/users/users';
import Home from './views/home/home';
import About from './views/about/about';
import OrderScreen from './views/order/order';
import Items from './views/items/items';
import ItemsList from './views/items/itemsList';
import { ProvideAuth } from './controllers/use-auth';
import PrivateRoute from './controllers/privateRoute';

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <MyAppBar />
        <Switch>
          <PrivateRoute path="/order" roles={['user']}>
            <OrderScreen />
          </PrivateRoute>
          <PrivateRoute path="/users" roles={['admin']}>
            <Users />
          </PrivateRoute>
          <PrivateRoute path="/items" roles={['admin']}>
            <ItemsList />
          </PrivateRoute>
          <PrivateRoute path="/itemsTable" roles={['admin']}>
            <Items />
          </PrivateRoute>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}
