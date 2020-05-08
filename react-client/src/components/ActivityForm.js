import React, { useState } from "react";
import { Button, Collapse } from "reactstrap";
import { addActivity, editActivity } from "../utils/apiCalls";

function ActivityForm (props){
const [actionToActivity, setActionToActivity] = useState("none");
const [selectedActivity, setSelectedActivity]= useState("none");
const [addFormIsOpen, setAddFormIsOpen] = useState(false);
const [editFormIsOpen, setEditFormIsOpen] = useState(false);

//activityJSON states
const [activityName, setActivityName] = useState();
const [activityLocation, setActivityLocation] = useState();
const [activityCoordinates, setActivityCoordinates] = useState();
const [activityTime_Start, setActivityTime_Start] = useState();
const [activityTime_End, setActivityTime_End] = useState();
const [activityNotes, setActivityNotes] = useState();

const update = async() => {
    let activityJSON = {
        activity_id: selectedActivity.id, 
        name: activityName, 
        location: activityLocation, 
        coordinates: activityCoordinates, 
        time_start: activityTime_Start, 
        time_end: activityTime_End, 
        notes: activityNotes
    }
    const updateA = await editActivity(activityJSON);
    if(updateA()){
        props.update();
    }
}

const add = async() => {
    let activityJSON = {
        plan_id: props.plan.id, 
        name: activityName, 
        location: activityLocation, 
        coordinates: activityCoordinates, 
        time_start: activityTime_Start, 
        time_end: activityTime_End, 
        notes: activityNotes
    }
    const addA = await addActivity(activityJSON);
    if(addA()){
        props.update();
    }
}

const toggleAddForm = () =>{
    setAddFormIsOpen(!addFormIsOpen);
}

const toggleEditForm = () =>{
    setEditFormIsOpen(!editFormIsOpen);
}


    if(actionToActivity === "none"){
        return(
            <div>
                <Button onClick={toggleAddForm}>Add Activity</Button>
                <Collapse isOpen={addFormIsOpen}>
                </Collapse> 
                <Button onClick={toggleEditForm}>Edit Activity</Button>
                <Collapse isOpen={editFormIsOpen}>
                </Collapse>
            </div>
        );
    }
}

export default ActivityForm;