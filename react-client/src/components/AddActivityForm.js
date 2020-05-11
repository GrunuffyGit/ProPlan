import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import { addActivity} from "../utils/apiCalls";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

function AddActivityForm (props){
    //activityJSON states
    const [activityName, setActivityName] = useState();
    const [activityLocation, setActivityLocation] = useState(null);
    const [activityCoordinates, setActivityCoordinates] = useState(null);
    const [activityTime_Start, setActivityTime_Start] = useState();
    const [activityTime_End, setActivityTime_End] = useState();
    const [activityNotes, setActivityNotes] = useState(null);


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
        console.log(e);
        let time = new Date(props.day);
        if(e[0]){
            time.setHours(e[0].substr(0,2));
            setActivityTime_Start(time);
        }else if(e[1]){
            time.setHours(e[1].substr(0,2));
            setActivityTime_End(time);
        }
    }

    return(
        <Form onSubmit={add} id="addActivityForm">
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
                <div />
                <TimeRangePicker
                    maxDetail="hour"
                    disableClock={true}
                    onChange={clockChange}
                />
            </FormGroup>
            <FormGroup>
                <Label>Notes</Label>
                <Input type="textarea" onChange={handleNoteChange}></Input>
            </FormGroup>
            <Button>Add New Activity</Button>
        </Form>
    );
}
export default AddActivityForm;