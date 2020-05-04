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

    let defaultColDef = {
        resizable: true
    };

    //setting up the time column
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

    let prevHourIndex = "";
    let rowSpanSpaces = [];
    //running through each activity
    for(const activity of props.activity){
        let time_start = new Date(activity.time_start);
        let time_end = new Date(activity.time_end);
        let date = formatDate(time_start);
        let timeSpanOfActivity = time_end.getHours() - time_start.getHours();

        //to store # of spaces needed for each activity
        let activityExists = rowSpanSpaces.findIndex((element)=> element.name === activity.name && element.day === date);
        if(activityExists === -1){
            rowSpanSpaces.push({
                name: activity.name,
                day: date,
                space: timeSpanOfActivity
            })
        }

        //to create the column for each day
        let dayExists = columnDefs.findIndex((element) => element.headerName === formatDate(time_start));
        if(dayExists === -1){
            columnDefs.push({
                headerName: date, 
                field: date,
                cellRenderer: 'cellRenderer',
                //determining how much each cell will be spanning
                rowSpan: function(params) {
                    prevHourIndex = rowData.findIndex((element) => element.time === params.data.time) -1;
                    if (params.data[date].length !== 0 && (rowData[prevHourIndex][date] !== params.data[date] || prevHourIndex === -1)) {
                        let indexOfSpace = rowSpanSpaces.findIndex((element)=> element.name === params.data[date]);
                        return rowSpanSpaces[indexOfSpace].space;
                    }else{
                        return 1;
                    }
                },
                //setting class for the divs for each cell to identify which cells are going to be spanned
                cellClass: function(params) {
                    if (params.data[date].length !== 0 && (rowData[prevHourIndex][date] !== params.data[date] || prevHourIndex === -1)) {
                        return "cellSpan";
                    }else{
                        return "normCell"
                    }
                }
            })
            for(let i = 0; i<rowData.length; i++){
                rowData[i][date] = "";
            }
        }
        for(let i=0; i<timeSpanOfActivity; i++){
            rowData[time_start.getHours()+i][date] = activity.name;
        }
    }

   
    columnDefs.sort((column1, column2) => {
        let date1 = new Date (column1.field);
        let date2 = new Date (column2.field);
        return date1.getUTCDate() - date2.getUTCDate()});

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
        width: '100em' }}>
            <AgGridReact
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}
                rowData={rowData}
                components={components}
                suppressRowTransform={true}
                suppressMovable={true}
                onGridReady={onGridReady}>
            </AgGridReact>
        </div>
    );
}

export default PlanTable;