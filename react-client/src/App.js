import React, { useEffect, useState } from 'react';
import './App.css';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-balham.css';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.prevData = "";
//     this.state = {
//       defaultColDef: {
//         resizable: true,
//       },
//       columnDefs: [
//       {
//         headerName: "Time", 
//         field: "time"
//       }, 
//       {
//         headerName: "Monday 2/12", 
//         field: "monday",
//         cellRenderer: 'cellRenderer',
//         rowSpan: function(params) {
//           if (params.data[this.field].length !== 0 && params.data[this.field] !== this.prevData) {
//             this.prevData = params.data[this.field];
//             return 24;
//           } else if(params.data[this.field].length === 0){
//             this.prevData = params.data[this.field];
//             return 2;
//           }else{
//             return 0;
//           }
//         },
//         cellClassRules: { 'cell': 'value !== undefined' }
//       }, 
//       {
//         headerName: "Tuesday 2/13", 
//         field: "tuesday",
//         cellRenderer: 'cellRenderer',
//         rowSpan:  function(params) {
//           if (params.data[this.field].length !== 0 && params.data[this.field] !== this.prevData) {
//             this.prevData = params.data[this.field];
//             return 24;
//           } else if(params.data[this.field].length === 0){
//             this.prevData = params.data[this.field];
//             return 2;
//           }else{
//             return 0;
//           }
//         },
//         cellClassRules: { 'cell': 'value !== undefined' }
//       },
//       {
//         headerName: "Wednesday 2/14", 
//         field: "wednesday",
//         cellRenderer: 'cellRenderer',
//         rowSpan:  function(params) {
//           if (params.data[this.field].length !== 0 && params.data[this.field] !== this.prevData) {
//             this.prevData = params.data[this.field];
//             return 2;
//           } else if(params.data[this.field].length === 0){
//             this.prevData = params.data[this.field];
//             return 2;
//           }else{
//             return 0;
//           }
//         },
//         cellClassRules: { 'cell': 'value !== undefined' }
//       },
//     ],
//       rowData: [
//         {
//         time: "12:00 AM", 
//         monday: "fish", 
//         tuesday: "same",
//         wednesday: "same"
//       }, 
//       {
//         time: "1:00 AM", 
//         monday: "fish", 
//         tuesday: "",
//         wednesday: ""
//       }, 
//       {
//         time: "2:00 AM", 
//         monday: "fish", 
//         tuesday: "",
//         wednesday: ""
//       },
//       {
//         time: "3:00 AM", 
//         monday: "", 
//         tuesday: "",
//         wednesday: ""
//       },
//       {
//         time: "4:00 AM", 
//         monday: "MakingChanges", 
//         tuesday: "",
//         wednesday: ""
//       },
//       {
//         time: "5:00 AM", 
//         monday: "travel", 
//         tuesday: "",
//         wednesday: ""
//       },
//       {
//         time: "6:00 AM", 
//         monday: "park", 
//         tuesday: "",
//         wednesday: "weewoo"
//       },
//       {
//         time: "7:00 AM", 
//         monday: "park", 
//         tuesday: "",
//         wednesday: "Merp"
//       },
//       {
//         time: "8:00 AM", 
//         monday: "park", 
//         tuesday: "",
//         wednesday: "Merp"
//       },
//       {
//         time: "9:00 AM", 
//         monday: "", 
//         tuesday: "ssss",
//         wednesday: ""
//       },
//       {
//         time: "10:00 AM", 
//         monday: "", 
//         tuesday: "Merp",
//         wednesday: ""
//       },
//       {
//         time: "11:00 AM", 
//         monday: "", 
//         tuesday: "Merp",
//         wednesday: "weewoo"
//       },
//     ],
//     components: { cellRenderer: createCellRenderer() }
//     }
//   }

  // onGridReady = params => {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  //   this.gridColumnApi.setColumnPinned("time", "left");
  //   this.gridApi.sizeColumnsToFit();
  // }

  // render() {
  //   return (
  //     <div
  //       className="ag-theme-balham"
  //       style={{
  //       height: '30em',
  //       width: '30em' }}
  //     >
  //       <AgGridReact
  //           columnDefs={this.state.columnDefs}
  //           rowData={this.state.rowData}
  //           components={this.state.components}
  //           suppressRowTransform={true}
  //           onGridReady={this.onGridReady}
  //         >
  //       </AgGridReact>
  //     </div>
  //   );
//   }
// }

import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import Profile from "./components/Profile";
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
    // <div className="App">
    //   <NavBar />
    //   <div>
    //     <Profile />
    //   </div>
    //  <div> Time is {time_start} and {time_end}</div>
    // </div>
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

// function createCellRenderer() {
//   function CellRenderer() {}
//   CellRenderer.prototype.init = function(params) {
//     var cellBlank = !params.value;
//     if (cellBlank) {
//       return null;
//     }
//     this.ui = document.createElement('div');
//     this.ui.innerHTML =
//       '<div>' +
//       params.value +
//       '</div>'
//   };
//   CellRenderer.prototype.getGui = function() {
//     return this.ui;
//   };
//   return CellRenderer;
// }

export default App;
