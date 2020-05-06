import React from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Views/Home';
import AllMyPlans from './Views/AllMyPlans';
import Planning from './Views/Planning';

function App() {
  return (
    <BrowserRouter>
        <NavBar/>
        <Route exact={true} path='/' render={() => (
          <div>
            <Home />
          </div>
        )}/>
        <Route exact={true} path='/MyPlans' render={() => (
          <div>
            <AllMyPlans />
          </div>
        )}/>
        <Route exact={true} path='/MyPlans/:planName/:planID' component={Planning}/>
    </BrowserRouter>
  );
}

export default App;
