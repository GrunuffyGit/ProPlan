import React from "react";
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

function formatDate(date){
    let MM = date.getMonth() + 1;
    let DD = date.getDate();
    let dayOfWeek = date.getDay();
        switch (dayOfWeek) {
            case 0:
                dayOfWeek = "Sunday";
                break;
            case 1:
                dayOfWeek = "Monday";
                break;
            case 2:
                dayOfWeek = "Tuesday";
                break;
            case 3:
                dayOfWeek = "Wednesday";
                break;
            case 4:
                dayOfWeek = "Thursday";
                break;
            case 5:
                dayOfWeek = "Friday";
                break;
            case 6:
                dayOfWeek = "Saturday";
        }
    return `${dayOfWeek} ${MM}/${DD}`;
}

const PlanTable = (props) => {
    if(typeof props.activity === "undefined"){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }else if( props.activity.length === 0){
        return(
            <div>
                <h1>No activity</h1>
            </div>
        );
    }

    let prevData = "none";
    let defaultColDef = {
        resizable: true
    };
    let columnDefs =[{
            headerName: "Time", 
            field: "time"
        }
    ];
    let rowData = [];

    let am_pm = "AM";
    for(let i=0; i<24; i++){
        let timeHour = i;
        if(i>11){
            am_pm = "PM"
            if(i !== 12){
                timeHour = timeHour-12;
            }
        }else if(i===0){
            timeHour = 12;
        }
        rowData.push({
            time:`${timeHour}:00 ${am_pm}`
        })
    }

    for(const activity of props.activity){
        console.log(activity);
        let time_start = new Date(activity.time_start);
        let time_end = new Date(activity.time_end);
        let date = formatDate(time_start);
        let dayExists = columnDefs.findIndex((element) => element.headerName === formatDate(time_start));
        if(dayExists === -1){
            columnDefs.push({
                headerName: date, 
                field: date,
                cellRenderer: 'cellRenderer',
                rowSpan: function(params) {
                    if (params.data[this.field].length !== 0 && params.data[this.field] !== prevData) {
                        prevData = params.data[this.field];
                        return 2;
                    }else if(params.data[this.field] === prevData){
                        return 0;
                    }else{
                        prevData = params.data[this.field];
                        return 1;
                    }
                },
                cellClassRules: { 
                    'cell': 'value !== undefined'
                }
            })
            for(let i = 0; i<rowData.length; i++){
                rowData[i][date] = "";
            }
        }
        let timeSpanOfActivity = time_end.getHours() - time_start.getHours();
        for(let i=0; i<timeSpanOfActivity; i++){
            rowData[time_start.getHours()+i][date] = activity.name;
        }
    }

    let components = {
        cellRenderer: createCellRenderer()
    };

    const onGridReady = params => {
        let gridApi = params.api;
        let gridColumnApi = params.columnApi;
        gridColumnApi.setColumnPinned("time", "left");
        // gridApi.sizeColumnsToFit();
        
    }

    return (
        <div
        className="ag-theme-balham"
        style={{
        height: '30em',
        width: '100rem' }}>
            <AgGridReact
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}
                rowData={rowData}
                components={components}
                suppressRowTransform={true}
                onGridReady={onGridReady}>
            </AgGridReact>
        </div>
    );
}

export default PlanTable;