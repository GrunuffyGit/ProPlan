import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import { addActivity, getCoordinates} from "../utils/apiCalls";
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

    const handleNoteChange = (e) =>{
        setActivityNotes(e.target.value);
    }

    const clockChange = e => {
        // console.log(e);
        let time = new Date(props.day);
        if(e[0]){
            time.setHours(e[0].substr(0,2));
            setActivityTime_Start(time);
        }else if(e[1]){
            time.setHours(e[1].substr(0,2));
            setActivityTime_End(time);
        }
    }

    let autocomplete;

    const google = window.google;

    function initAutocomplete() {
        autocomplete = new google.maps.places.Autocomplete(document.getElementById('autoLocationAdd'));
        autocomplete.setFields(['formatted_address', 'geometry']);
        autocomplete.addListener('place_changed', fillInAddress);
    }

    async function fillInAddress() {
        let place = await autocomplete.getPlace();
        if(place.name){
            setActivityLocation(place.name);
            setActivityCoordinates(null);
        }else{
            setActivityLocation(place.formatted_address);
            setActivityCoordinates(place.geometry.location.toString());
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
                <Input type="text" 
                id="autoLocationAdd"
                placeholder="Enter Address"
                onFocus={initAutocomplete}
                ></Input>
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