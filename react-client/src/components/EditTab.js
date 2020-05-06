import React, { useState } from 'react';
import DropDown from './DropDown';
import PlanTable from './PlanTable';

const EditTab = (props) => {
    const [selectedDay, setSelectedDay] = useState("none");
    const onClick = e => {
        setSelectedDay(e.target.id);
    }
    if(typeof props.activities === "undefined"){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }else if( props.activities.length === 0){
        return(
            <div>
                <h1>No activity</h1>
            </div>
        );
    }

    let activitiesSortedByDay = [];
    let daysInPlan = [];

    for(const activity of props.activities){
        let day = new Date(activity.time_start);
        day = day.toLocaleDateString(undefined, {weekday:"long", month:"numeric", day: "numeric"});
        let indexOfDay = daysInPlan.findIndex(element => element === day);
        if(indexOfDay === -1){
            daysInPlan.push(day);
            activitiesSortedByDay[day] = [];
        }
        activitiesSortedByDay[day].push(activity);
    }

    console.log(daysInPlan);
    console.log(activitiesSortedByDay);

    if(selectedDay !== "none"){
        return (
            <div>
                <DropDown onClick={onClick} ddOptions={daysInPlan}/>
                <h1>your selected {selectedDay}</h1>
                <PlanTable activity={activitiesSortedByDay[selectedDay]} />
            </div>
        )
    }
    return (
        <div>
            <DropDown onClick={onClick} ddOptions={daysInPlan}/>
        </div>
    );
}

export default EditTab;