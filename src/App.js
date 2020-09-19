import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import logo from './logo.svg';
import Layout from '../src/containers/Layout/Layout'
import Splash from '../src/containers/Splash/Splash'
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/room">
          <Layout />
        </Route>
        <Route path="/" >
          <Splash />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
