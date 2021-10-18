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
import OrderScreen from './views/tables/order/order';
import TenderScreen from './views/tables/tender/tender';
import Tables from './views/tables/tables';
import Items from './views/items/items';
import ClosedTables from './views/closedTables/closedTables';
import ViewClosedTable from './views/closedTables/viewClosedTable/viewClosedTable';
import { ProvideAuth } from './controllers/use-auth';
import PrivateRoute from './controllers/privateRoute';
import Layouts from './views/layouts/layouts';
import LayoutEditPage from './views/layouts/layoutEditPage';

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <MyAppBar />
        <Switch>
          <PrivateRoute path="/tables/:tableId/order" permission="order:read">
            <OrderScreen />
          </PrivateRoute>
          <PrivateRoute path="/tables/:tableId/tender" permission="tender:read">
            <TenderScreen />
          </PrivateRoute>
          <PrivateRoute path="/tables/:tableId/viewClosedTable" permission="closedTable:read">
            <ViewClosedTable />
          </PrivateRoute>
          <PrivateRoute path="/tables" permission="order:read">
            <Tables />
          </PrivateRoute>
          <PrivateRoute path="/closedTables" permission="closedTable:read">
            <ClosedTables />
          </PrivateRoute>
          <PrivateRoute path="/users" permission="user:read">
            <Users />
          </PrivateRoute>
          <PrivateRoute path="/layouts/:layoutId/edit" permission="layout:write">
            <LayoutEditPage />
          </PrivateRoute>
          <PrivateRoute path="/layouts" permission="layout:read">
            <Layouts />
          </PrivateRoute>
          <PrivateRoute path="/items" permission="item:read">
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
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}
