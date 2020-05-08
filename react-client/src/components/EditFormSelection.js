import React from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input} from "reactstrap";
import { addActivity, editActivity } from "../utils/apiCalls";
import DropDown from "./DropDown";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

function EditFormSelection (props) {
    return(
        <div>
            {props.activityToEdit.name}
        </div>
    )
}

export default EditFormSelection;