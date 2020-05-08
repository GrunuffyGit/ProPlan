import React, { useState } from 'react';
import DropDown from './DropDown';
import PlanTable from './PlanTable';
import ActivityForm from './ActivityForm';

const sortingActivities = (activiesToSort, sortedActivityArray) => {
    let formatArray = [];
    for(const activity of activiesToSort){
        let day = new Date(activity.time_start);
        let format = day.toLocaleDateString(undefined, {weekday:"long", month:"numeric", day: "numeric"});
        let indexOfDay = formatArray.findIndex(element => element === format);
        if(indexOfDay === -1){
            formatArray.push(format);
            sortedActivityArray[format] = [];
        }
        sortedActivityArray[format].push(activity);
    }
}

const sortingDay = (daysArray, plan) =>{
    let day_start = new Date(plan.start_date);
    let day_end = new Date(plan.end_date);
    let days = day_start.getDate();
    let planDuration = (day_end - day_start)/(24*60*60*1000);
    for(let i=0; i<=planDuration; i++){
        let day = new Date (day_start);
        day.setDate(days + i);
        let format = day.toLocaleDateString(undefined, {weekday:"long", month:"numeric", day: "numeric"});
        daysArray.push(format);
    }
}

const getSelectedDayInPlan = (plan, daySelected) =>{
    let day_start = new Date(plan.start_date);
    let day_end = new Date(plan.end_date);
    let days = day_start.getDate();
    let planDuration = (day_end - day_start)/(24*60*60*1000);
    let daysArray = [];
    for(let i=0; i<=planDuration; i++){
        let day = new Date (day_start);
        day.setDate(days + i);
        daysArray.push(day);
    }
    let indexOfChoosenDay = daysArray.findIndex(day => day.toLocaleDateString(undefined, {weekday:"long", month:"numeric", day: "numeric"})===daySelected);
    let dateobj = {
        start_date: new Date(daysArray[indexOfChoosenDay]),
        end_date: new Date(daysArray[indexOfChoosenDay])
    }
    return dateobj;
}

const EditTab = (props) => {
    const [selectedDay, setSelectedDay] = useState("none");
    const [planObj, setPlanObj] = useState();
    const [currentActivities, setCurrentActivities] = useState([]);

    if(typeof props.activities === "undefined" || typeof props.plan === "undefined"){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    let activitiesSortedByDay = [];
    let daysInPlan = [];
    sortingDay(daysInPlan, props.plan);
    sortingActivities(props.activities, activitiesSortedByDay);

    const selectDay = e => {
        setSelectedDay(e.target.id);
        if(props.activities.length !== 0){
            setCurrentActivities(activitiesSortedByDay[e.target.id]);
        }
        setPlanObj(getSelectedDayInPlan(props.plan, e.target.id));
    }
    const updateActivities = e =>{
        props.update();
    }

    if(selectedDay !== "none"){
        return (
            <div>
                <DropDown onClick={selectDay} ddOptions={daysInPlan}/>
                <h1>your selected {selectedDay}</h1>
                <PlanTable plan={planObj} activity={currentActivities}/>
                <ActivityForm plan={props.plan} activity={currentActivities} update={updateActivities}/>
            </div>
        )
    }
    return (
        <div>
            <DropDown onClick={selectDay} ddOptions={daysInPlan}/>
        </div>
    );
}

export default EditTab;