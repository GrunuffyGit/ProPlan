import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { editActivity, deleteActivity } from "../utils/apiCalls";

function EditActivityForm (props) {
    // console.log(props);
    const [activityName, setActivityName] = useState(props.activityToEdit.name);
    const [activityLocation, setActivityLocation] = useState(props.activityToEdit.location);
    const [activityCoordinates, setActivityCoordinates] = useState(props.activityToEdit.coordinates);
    const [activityTime_Start, setActivityTime_Start] = useState(props.activityToEdit.time_start);
    const [activityTime_End, setActivityTime_End] = useState(props.activityToEdit.time_end);
    let start = new Date(props.activityToEdit.time_start);
    let end = new Date(props.activityToEdit.time_end);
    const [startHR, setStartHR] = useState(start.getHours());
    const [endHR, setEndHR] = useState(end.getHours());
    const [activityNotes, setActivityNotes] = useState(props.activityToEdit.notes);
    
    useEffect(()=>{
        setActivityName(props.activityToEdit.name);
        setActivityLocation(props.activityToEdit.location);
        setActivityTime_Start(props.activityToEdit.time_start);
        setActivityTime_End(props.activityToEdit.time_end);
        setActivityNotes(props.activityToEdit.notes);
        start = new Date(props.activityToEdit.time_start);
        end = new Date(props.activityToEdit.time_end);
        setStartHR(start.getHours());
        setEndHR(end.getHours());
    },[props])

    const handleNameChange = (e) =>{
        setActivityName(e.target.value);
    }
    const handleNoteChange = (e) =>{
        setActivityNotes(e.target.value);
    }

    const edit = async(e) => {
        e.preventDefault();
        let activityJSON = {
            activity_id: props.activityToEdit.id, 
            name: activityName, 
            location: activityLocation, 
            coordinates: activityCoordinates, 
            time_start: activityTime_Start, 
            time_end: activityTime_End, 
            notes: activityNotes
        }
        
        // console.log(activityJSON);
        const updateA = await editActivity(activityJSON);
        if(updateA){
            props.update();
        }
    }

    const deleteCurrentActivity = async(e) => {
        e.preventDefault();
        const deleteA = await deleteActivity(props.activityToEdit.id);
        if(deleteA){
            props.update();
        }
    }

    const clockChange = e => {
        // console.log(e);
        if(e[0]){
            let time1 = new Date(props.day);
            // console.log("timestart before", time1);
            let hour1 = e[0].split(":");
            time1.setHours(hour1[0]);
            setActivityTime_Start(time1);
            setStartHR(time1.getHours());
            // console.log("timestart after",time1);
        }
        if(e[1]){
            let time2 = new Date(props.day);
            // console.log("timeend before", time2);
            let hour2 = e[1].split(":");
            time2.setHours(hour2[0]);
            setActivityTime_End(time2);
            setEndHR(time2.getHours());
            // console.log("timeend after",time2);
        }
    }

    let autocomplete;

    const google = window.google;

    function initAutocomplete() {
        autocomplete = new google.maps.places.Autocomplete(document.getElementById('autoLocationEdit'));
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
        <Form id="editActivityForm">
            <FormGroup>
                <Label>Activity Name</Label>
                <Input type="text" onChange={handleNameChange} value={activityName} required></Input>
            </FormGroup>
            <FormGroup>
                <Label>Location</Label>
                <Input type="text" 
                id="autoLocationEdit"
                placeholder={activityLocation}
                onFocus={initAutocomplete}></Input>
            </FormGroup>
            <FormGroup>
                <Label>Time Duration</Label>
                <div />
                <TimeRangePicker
                    maxDetail="hour"
                    disableClock={true}
                    onChange={clockChange}
                    value={[`${startHR}:00`, `${endHR}:00`]}
                />
            </FormGroup>
            <FormGroup>
                <Label>Notes</Label>
                <Input type="textarea" onChange={handleNoteChange} value={activityNotes}></Input>
            </FormGroup>
            <Button id="deleteActBtn" onClick={deleteCurrentActivity}>Delete Activity</Button>
            <Button id="saveActBtn" onClick={edit}>Save Changes</Button>
        </Form>
    )
}

export default EditActivityForm;