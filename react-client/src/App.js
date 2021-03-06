import React from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Views/Home';
import AllMyPlans from './Views/AllMyPlans';
import Planning from './Views/Planning';
import { useAuth0 } from './react-auth0-spa';

function App() {
  const { loading } = useAuth0();
  if(loading){
    return (<img className="loadingImg" src="https://steamuserimages-a.akamaihd.net/ugc/779615184453193381/6545C065131A71752DEC0EB8EFF64A166177DCFD/"></img>);
  }
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
