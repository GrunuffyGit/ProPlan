import React, { useState, useEffect } from 'react';
import DropDown from './DropDown';
import PlanTable from './PlanTable';
import ActivityForm from './ActivityForm';
import { Row, Col } from 'reactstrap';

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
    return daysArray[indexOfChoosenDay];
}

const EditTab = (props) => {
    const [selectedDay, setSelectedDay] = useState();
    const [rawSelectedDay, setRawSelectedDay] = useState();
    const [planObj, setPlanObj] = useState();
    const [currentActivities, setCurrentActivities] = useState([]);

    let activitiesSortedByDay = [];
    let daysInPlan = [];

    const selectDay = e => {
        // console.log("after selection",activitiesSortedByDay);
        setSelectedDay(e.target.id);
        if(activitiesSortedByDay[e.target.id]){
            setCurrentActivities(activitiesSortedByDay[e.target.id]);
        }else{
            setCurrentActivities([]);
        }
        let date = getSelectedDayInPlan(props.plan, e.target.id);
        setRawSelectedDay(date);
        setPlanObj({
            start_date: new Date(date),
            end_date: new Date(date)
        });
    }
    const updateActivities = e =>{
        props.update();
    }

    useEffect(()=>{
        if(props.activities){
            activitiesSortedByDay = [];
            sortingActivities(props.activities, activitiesSortedByDay);
            // console.log("effect", activitiesSortedByDay);
            if(selectedDay){
                // console.log("effect",selectedDay);
                // console.log("effect", currentActivities);
                // console.log("effect", activitiesSortedByDay);
                if(activitiesSortedByDay[selectedDay]){
                    setCurrentActivities(activitiesSortedByDay[selectedDay]);
                }
            } 
        }
    },[props]);

    if(typeof props.activities === "undefined" || typeof props.plan === "undefined"){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    sortingDay(daysInPlan, props.plan);
    sortingActivities(props.activities, activitiesSortedByDay);

    // console.log(selectedDay);
    // console.log(currentActivities);
    if(selectedDay){
        return (
            <div>
                <DropDown buttonName="Select a New Day" onClick={selectDay} ddOptions={daysInPlan}/>
                <Row>
                    <Col id="tableContainer">
                        <PlanTable plan={planObj} activity={currentActivities}/>
                    </Col>
                    <Col>
                        <ActivityForm plan={props.plan} activity={currentActivities} update={updateActivities} day={rawSelectedDay}/>
                    </Col>
                </Row>
                
            </div>
        )
    }
    return (
        <div>
            <h1 id="selectDayHeader">Select a day to view and edit your activities!</h1>
            <DropDown buttonName="Select a Day" onClick={selectDay} ddOptions={daysInPlan}/>
        </div>
    );
}

export default EditTab;