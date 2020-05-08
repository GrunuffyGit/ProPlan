import React, { useState } from "react";
import { Button, Row, Col } from "reactstrap";
import { addActivity, editActivity } from "../utils/apiCalls";
import AddEditActivityForm from "./AddEditActivityForm";

function ActivityForm (props){
    //true for view, false for edit
    const [actionToActivity, setActionToActivity] = useState(true);

    const toggleForm = () =>{
        setActionToActivity(!actionToActivity);
    }

    return(
        <div>
            <Row>
                <Col>
                    <Button onClick={toggleForm} size="lg" block>Add Activity</Button>
                </Col>
                <Col>
                    <Button onClick={toggleForm}size="lg" block>Edit Activity</Button>
                </Col>
            </Row>
            <AddEditActivityForm 
                plan={props.plan} 
                activity={props.activity} 
                update={props.update} 
                form={actionToActivity}
                day={props.day}
                />
        </div>
    );
}

export default ActivityForm;