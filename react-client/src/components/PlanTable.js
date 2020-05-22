import React from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { formatDate } from "../utils/HelperFunc";

function createCellRenderer() {
    function CellRenderer() {}
    CellRenderer.prototype.init = function(params) {
        var cellBlank = !params.value;
        if (cellBlank) {
            return null;
        }
        this.ui = document.createElement('div');
        this.ui.innerHTML = params.value;
    };
    CellRenderer.prototype.getGui = function() {
      return this.ui;
    };
    return CellRenderer;
}

const PlanTable = (props) => {
    if(typeof props.activity === "undefined" || typeof props.plan === "undefined"){
        return(
            <div>
                <img className="loadingImg" src="https://steamuserimages-a.akamaihd.net/ugc/779615184453193381/6545C065131A71752DEC0EB8EFF64A166177DCFD/"></img>
            </div>
        );
    }

    let defaultColDef = {
        resizable: true
    };

    //setting up the time column
    let columnDefs =[{
            headerName: "Time", 
            field: "time",
            width: 120,
            lockPosition: true
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
            time:`${timeHour}:00 ${am_pm}`,
            rowSpan: {}
        })
    }


    let days = [];
    //grabbing days for the columns
    let planStart = new Date(props.plan.start_date);
    let planEnd = new Date(props.plan.end_date);
    let planDuration = (planEnd - planStart)/(24*60*60*1000);
    let planStartDate = planStart.getDate();
    for(let i=0; i<=planDuration; i++){
        let start_date = new Date (planStart);
        start_date.setDate(planStartDate + i);
        let formatedDate = formatDate(start_date);
        days.push(formatedDate);
        for(let i=0; i< rowData.length; i++){
            rowData[i][formatedDate] = "";

        }
    }

    //setting up rowData
    for(const activity of props.activity){
        let start = new Date(activity.time_start);
        let start_day = formatDate(start);
        let end = new Date(activity.time_end);
        let start_hour = start.getHours();
        let end_hour = end.getHours();
        let duration = end_hour - start_hour;
        rowData[start_hour].rowSpan[start_day] = duration;
        for(let i=0; i < duration; i++){
            rowData[start_hour + i][start_day] = activity.name;
        }
    }

    let cellWidth;
    if(window.screen.width > 400){
        cellWidth = 300;
        if(days.length === 1){
            cellWidth = (window.screen.width/2)-120
        }
    }else{
        cellWidth = (window.screen.width)-120;
    }

    //setting up column
    for(let i=0; i<days.length; i++){
        columnDefs.push({
            headerName: days[i], 
            field: days[i],
            width: cellWidth,
            cellRenderer: 'cellRenderer',
            //determining how much each cell will be spanning
            rowSpan: function(params) {
                if(params.data.rowSpan[params.colDef.field]){
                    return params.data.rowSpan[params.colDef.field];
                }else{
                    return 1;
                }
            },
            //setting class for the divs for each cell to identify which cells are going to be spanned
            cellClass: function(params) {
                if(params.data.rowSpan[params.colDef.field]){
                    let day = params.colDef.field.split(" ");
                    return `cellSpan-${day[0]}`;
                }else if(params.data[params.colDef.field] !== 0){
                    return "partCellSpan";
                }else{
                    return "normCell";
                }
            }
        })
    }
   
    columnDefs.sort((column1, column2) => {
        let date1 = new Date (column1.field);
        let date2 = new Date (column2.field);
        return date1.getUTCDate() - date2.getUTCDate()
    });

    let components = {
        cellRenderer: createCellRenderer()
    };

    const onGridReady = params => {
        let gridColumnApi = params.columnApi;
        gridColumnApi.setColumnPinned("time", "left");
        
    }

    let tableHeight = (window.screen.height/1.67);
    return (
        <div
        className="ag-theme-material"
        style={{
        height: tableHeight,
        width: '100%' }}>
            <AgGridReact
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}
                suppressDragLeaveHidesColumns={true}
                rowData={rowData}
                components={components}
                suppressRowTransform={true}
                onGridReady={onGridReady}
                >
            </AgGridReact>
        </div>
    );
}

export default PlanTable;