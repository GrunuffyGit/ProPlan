import React, { useState } from "react";
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,     
    Col
} from 'reactstrap';
import { editPlan } from "../utils/apiCalls";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';


function EditPlanForm (props){
    const [name, setName] = useState(props.plan.name);
    const [description, setDescription] = useState(props.plan.description);
    const [imageURL, setimageURL] = useState(props.plan.image_url);
    const [dates, setDates] = useState([new Date(props.plan.start_date), new Date(props.plan.end_date)]);

    const edit = e => {
        e.preventDefault();
        let planJSON = {
            plan_id: props.plan.id,
            name: name, 
            description: description, 
            image_url: imageURL, 
            start_date: dates[0], 
            end_date: dates[1]
        }
        const editP = async()=> {
            let planCall = await editPlan(planJSON)
            if(planCall){
                props.update();
            }
        }
        editP();
        props.toggle();
    }
    const handleNameChange = (e) =>{
        setName(e.target.value);
    }
    const handleDescriptionChange = (e) =>{
        setDescription(e.target.value);
    }
    const handleImageURLChange = (e) =>{
        setimageURL(e.target.value);
    }
    const handleDateChange = (e) =>{
        setDates(e);
    }

    return(
        <Modal isOpen={props.isModalOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Edit Plan</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Plan Name</Label>
                        <Input type="text" onChange={handleNameChange} value={name} required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Dates</Label>{"  "}
                        <DateRangePicker
                            onChange={handleDateChange}
                            value={dates}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Image URL</Label>
                        <Input type="text" onChange={handleImageURLChange} value={imageURL}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" onChange={handleDescriptionChange} value={description}></Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={edit}>Edit</Button>{' '}
            <Button color="secondary" onClick={props.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default EditPlanForm;