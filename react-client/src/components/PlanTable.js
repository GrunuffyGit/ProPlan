import React from "react";

const PlanTable = (props) => {
    console.log(props.activity);
    if(typeof props.activity === "undefined" || props.activity.length === 0){
        return(
            <div>
                <h1>No activity</h1>
            </div>
        );
    }
    return (
        <div>
            <h1>You got activities</h1>
        </div>
    );
}

export default PlanTable;