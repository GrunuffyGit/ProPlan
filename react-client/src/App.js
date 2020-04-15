import React from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
      {
        headerName: "Time", 
        field: "time"
      }, 
      {
        headerName: "Monday 2/12", 
        field: "monday"
      }, 
      {
        headerName: "Tuesday 2/13", 
        field: "tuesday"
      },
      {
        headerName: "Wednesday 2/14", 
        field: "wednesday"
      },
    ],
      rowData: [
        {
        time: "12:00 AM", 
        monday: "Celica", 
        tuesday: 35000,
        wednesday: "poop"
      }, 
      {
        time: "1:00 AM", 
        monday: "Mondeo", 
        tuesday: 32000,
        wednesday: "poop"
      }, 
      {
        time: "2:00 AM", 
        monday: "Boxter", 
        tuesday: 72000,
        wednesday: "poop"
      },
      {
        time: "3:00 AM", 
        monday: "Boxter", 
        tuesday: 72000,
        wednesday: "poop"
      },
      {
        time: "4:00 AM", 
        monday: "Boxter", 
        tuesday: 72000,
        wednesday: "poop"
      },
      {
        time: "5:00 AM", 
        monday: "Boxter", 
        tuesday: 72000,
        wednesday: "poop"
      },
    ]
    }
  }

  onGridReady = params => {
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.setColumnPinned("time", "left");
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '20vh',
        width: '50vw' }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          onGridReady={this.onGridReady}
          >
        </AgGridReact>
      </div>
    );
  }
}

export default App;
