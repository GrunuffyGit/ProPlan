import React, { useState } from "react";
import DropDown from "./DropDown";
import EditActivityForm from "./EditActivityForm";

function EditActivity (props){
    const [selectedActivity, setSelectedActivity]= useState();
    const activityToEdit = e =>{
        setSelectedActivity(e.target.id);
    }

    if(typeof props.activity === "undefined"){
        return(
            <div>
                <img className="loadingImg" src="https://steamuserimages-a.akamaihd.net/ugc/779615184453193381/6545C065131A71752DEC0EB8EFF64A166177DCFD/"></img>
            </div>
        );
    }

    //setting up dropdown options
    let ddOpt = [];
    for(const activity of props.activity){
        ddOpt.push(activity.name);
    }

    if(selectedActivity){
        let indexOfActivity = props.activity.findIndex(act => act.name === selectedActivity);
        if(indexOfActivity > -1){
            return(
                <div>
                    <DropDown id="selectActivityBtn" buttonName="Select an Activity" ddOptions={ddOpt} onClick={activityToEdit}/>
                    <EditActivityForm day={props.day} update={props.update} selectedActivity={selectedActivity} activityToEdit={props.activity[indexOfActivity]}/>
                </div>
                
            );
        }
    }
    return(
        <div>
            <DropDown id="selectActivityBtn" buttonName="Select an Activity" ddOptions={ddOpt} onClick={activityToEdit}/>
        </div>
    );
}
export default EditActivity;