import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Cars from './features/cars/Cars';
import AddCar from './features/cars/AddCar';
import NavBar from './features/cars/NavBar';

import './App.css';


function App() {
  return (
    <div className="App">
      <NavBar />
        <Switch>
          <Route exact path='/'>
            <Cars />
          </Route>
          <Route exact path='/add'>
            <AddCar />
          </Route>
          <Route exact path='/update/:id'>
            <AddCar />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
