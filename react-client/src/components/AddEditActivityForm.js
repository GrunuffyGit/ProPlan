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

    console.log(ddOpt);
    if(props.form){
        return(
            <Form>
                <FormGroup>
                    <Label>Activity Name</Label>
                    <Input type="text"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Location</Label>
                    <Input type="text"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Time Duration</Label>
                    <TimeRangePicker
                        maxDetail="hour"
                        disableClock={true}
                        onChange={clockChange}
                        required={true}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Notes</Label>
                    <Input type="text"></Input>
                </FormGroup>
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