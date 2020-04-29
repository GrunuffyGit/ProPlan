import React from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Views/Home';
import MyPlans from './Views/Plans';

function App() {
  // const { loading } = useAuth0();
  // const [time_start, setTime_start] = useState();
  // const [time_end, setTime_end] = useState();

  // useEffect(()=>{
  //   let a = async()=>{fetch("/activities/1",{
  //     method: "GET"
  //   })
  //   .then((res)=>{return res.json()})
  //   .then((data) => 
  //   { let time = new Date (data[0].time_start);
  //     setTime_start(time.toLocaleTimeString());
  //     time = new Date (data[0].time_end);
  //     setTime_end(time.toLocaleTimeString());
  //   })}
  //   a();
  // })
  
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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
            <MyPlans />
          </div>
        )}/>
    </BrowserRouter>
  );
}

export default App;
