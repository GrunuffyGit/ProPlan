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
    Input     
} from 'reactstrap';
import { addPlan } from "../utils/apiCalls";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';


function PlanForm (props){
    const [name, setName] = useState();
    const [description, setDescription] = useState(null);
    const [imageURL, setimageURL] = useState(null);
    const [dates, setDates] = useState([new Date(), new Date()]);

    const add = e => {
        e.preventDefault();
        let planJSON = {
            created_by: props.user.sub,
            name: name, 
            description: description, 
            image_url: imageURL, 
            start_date: dates[0], 
            end_date: dates[1]
        }
        const addP = async()=> {
            console.log(planJSON);
            // let planCall = await addPlan(planJSON);
            // if(planCall){
            //     props.update();
            // }
        }
        addP();
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
        console.log(e);
        setDates(e);
    }

    return(
        <Modal isOpen={props.isModalOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Create a Plan!</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Plan Name</Label>
                        <Input type="text" onChange={handleNameChange} required></Input>
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
                        <Input type="text" onChange={handleImageURLChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" onChange={handleDescriptionChange}></Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={add}>Create</Button>{' '}
            <Button color="secondary" onClick={props.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default PlanForm;