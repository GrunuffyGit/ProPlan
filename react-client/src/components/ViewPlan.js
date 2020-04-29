import React, {useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

function createCellRenderer() {
    function CellRenderer() {}
    CellRenderer.prototype.init = function(params) {
        var cellBlank = !params.value;
        if (cellBlank) {
            return null;
        }
        this.ui = document.createElement('div');
        this.ui.innerHTML =
            '<div>' +
            params.value +
            '</div>'
    };
    CellRenderer.prototype.getGui = function() {
      return this.ui;
    };
    return CellRenderer;
}

const ViewPlan = () => {
    let prevData = "";
    const [defaultColDef, setDefaultColDef] = useState({
        resizable: true
    });
    const [columnDefs, setColumnDefs] = useState([{
            headerName: "Time", 
            field: "time"
        }, 
        {
            headerName: "Monday 2/12", 
            field: "monday",
            cellRenderer: 'cellRenderer',
            rowSpan: function(params) {
                if (params.data[this.field].length !== 0 && params.data[this.field] !== prevData) {
                    prevData = params.data[this.field];
                    return 24;
                } else if(params.data[this.field].length === 0 || params.data[this.field] === prevData){
                    prevData = params.data[this.field];
                    return 0;
                }
            },
            cellClassRules: { 
                'cell': 'value !== undefined',
                'cell-span': "value==='fish' || value==='park'"
            }
        }, 
        {
            headerName: "Tuesday 2/13", 
            field: "tuesday",
            cellRenderer: 'cellRenderer',
            rowSpan:  function(params) {
                if (params.data[this.field].length !== 0 && params.data[this.field] !== prevData) {
                    prevData = params.data[this.field];
                    return 24;
                }else if(params.data[this.field].length === 0){
                    prevData = params.data[this.field];
                    return 0;
                }
            },
            cellClassRules: { 'cell': 'value !== undefined' }
        },
        {
            headerName: "Wednesday 2/14", 
            field: "wednesday",
            cellRenderer: 'cellRenderer',
            rowSpan:  function(params) {
                if (params.data[this.field].length !== 0 && params.data[this.field] !== prevData) {
                    prevData = params.data[this.field];
                    return 2;
                } else if(params.data[this.field].length === 0){
                    prevData = params.data[this.field];
                    return 0;
                }
            },
                cellClassRules: { 'cell': 'value !== undefined' }
        }
    ]);
    const [rowData, setRowData] = useState([
        {
            time: "12:00 AM", 
            monday: "fish", 
            tuesday: "same",
            wednesday: "same"
        }, 
        {
            time: "1:00 AM", 
            monday: "fish", 
            tuesday: "",
            wednesday: ""
        }, 
        {
            time: "2:00 AM", 
            monday: "fish", 
            tuesday: "",
            wednesday: ""
        },
        {
            time: "3:00 AM", 
            monday: "", 
            tuesday: "",
            wednesday: ""
        },
        {
            time: "4:00 AM", 
            monday: "MakingChanges", 
            tuesday: "",
            wednesday: ""
        },
        {
            time: "5:00 AM", 
            monday: "travel", 
            tuesday: "",
            wednesday: ""
        },
        {
            time: "6:00 AM", 
            monday: "park", 
            tuesday: "",
            wednesday: "weewoo"
        },
        {
            time: "7:00 AM", 
            monday: "park", 
            tuesday: "",
            wednesday: "Merp"
        },
        {
            time: "8:00 AM", 
            monday: "park", 
            tuesday: "",
            wednesday: "Merp"
        },
        {
            time: "9:00 AM", 
            monday: "", 
            tuesday: "ssss",
            wednesday: ""
        },
        {
            time: "10:00 AM", 
            monday: "", 
            tuesday: "Merp",
            wednesday: ""
        },
        {
            time: "11:00 AM", 
            monday: "", 
            tuesday: "Merp",
            wednesday: "weewoo"
        },
    ]);
    const [components, setComponents] = useState({
        cellRenderer: createCellRenderer()
    });

    const onGridReady = params => {
        let gridApi = params.api;
        let gridColumnApi = params.columnApi;
        // let gridOptions = params.options;
        // gridOptions.suppressRowTransform = true;
        gridColumnApi.setColumnPinned("time", "left");
        gridApi.sizeColumnsToFit();
        
    }

  return (
    <div
        className="ag-theme-balham"
        style={{
        height: '30em',
        width: '50rem' }}
    >
        <AgGridReact
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowData={rowData}
            components={components}
            suppressRowTransform={true}
            onGridReady={onGridReady}
          >
        </AgGridReact>
    </div>
  );
};

export default ViewPlan;