import React, { useState } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input} from "reactstrap";
import { addActivity, editActivity } from "../utils/apiCalls";
import DropDown from "./DropDown";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import EditFormSelection from "./EditFormSelection";

function AddEditActivityForm (props){
    const [selectedActivity, setSelectedActivity]= useState();
    //activityJSON states
    const [activityName, setActivityName] = useState();
    const [activityLocation, setActivityLocation] = useState(null);
    const [activityCoordinates, setActivityCoordinates] = useState(null);
    const [activityTime_Start, setActivityTime_Start] = useState();
    const [activityTime_End, setActivityTime_End] = useState();
    const [activityNotes, setActivityNotes] = useState(null);


    const update = async(e) => {
        e.preventDefault();
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
        if(updateA){
            props.update();
        }
    }

    const add = e => {
        e.preventDefault();
        let activityJSON = {
            plan_id: props.plan.id, 
            name: activityName, 
            location: activityLocation, 
            coordinates: activityCoordinates, 
            time_start: activityTime_Start, 
            time_end: activityTime_End, 
            notes: activityNotes
        }
        const addA = async()=> {
            let actCall = await addActivity(activityJSON);
            if(actCall){
                props.update();
            }
        }
        addA();
    }

    const handleNameChange = (e) =>{
        setActivityName(e.target.value);
    }
    const handleLocationChange = (e) =>{
        setActivityLocation(e.target.value);
    }
    const handleNoteChange = (e) =>{
        setActivityNotes(e.target.value);
    }

    const clockChange = e => {
        let time = new Date(props.day);
        if(e[0]){
            time.setHours(e[0].substr(0,2));
            setActivityTime_Start(time);
        }else if(e[1]){
            time.setHours(e[1].substr(0,2));
            setActivityTime_End(time);
        }
    }

    const activityToEdit = e =>{
        setSelectedActivity(e.target.id)
    }

    //setting up dropdown options
    let ddOpt = [];
    for(const activity of props.activity){
        ddOpt.push(activity.name);
    }

    if(props.form){
        return(
            <Form onSubmit={add}>
                <FormGroup>
                    <Label>Activity Name</Label>
                    <Input type="text" onChange={handleNameChange} required></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Location</Label>
                    <Input type="text" onChange={handleLocationChange}></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Time Duration</Label>
                    <TimeRangePicker
                        maxDetail="hour"
                        disableClock={true}
                        onChange={clockChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Notes</Label>
                    <Input type="text" onChange={handleNoteChange}></Input>
                </FormGroup>
                <Button>Add!</Button>
            </Form>
        );
    }
    if(selectedActivity){
        let indexOfActivity = props.activity.findIndex(act => act.name === selectedActivity);
        return(
            <div>
                <DropDown buttonName="Select an Activity" ddOptions={ddOpt} onClick={activityToEdit}/>
                <EditFormSelection activityToEdit={props.activity[indexOfActivity]}/>
            </div>
            
        );
    }
    return(
        <div>
            <DropDown buttonName="Select an Activity" ddOptions={ddOpt} onClick={activityToEdit}/>
        </div>
    );
}
export default AddEditActivityForm;