import React from 'react';
import { 
    Card,
    CardImg, 
    CardTitle, 
    CardText, 
    CardBody, 
    Col,
    CardSubtitle,
    Button} from 'reactstrap';

const PlanCard = (props) =>{
    const {id, name, description, image_url, start_date, end_date} = props.plan;
    let begin_date = new Date (start_date);
    begin_date  = begin_date.toDateString();
    let stop_date = new Date (end_date);
    stop_date = stop_date.toDateString();

    return(
        <Col xs="4">
            <Card>
                <CardImg
                className="planImage"
                src={image_url}
                alt="planImage"
                />
                <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardSubtitle>{formatDate(start_date)} - {formatDate(end_date)}</CardSubtitle>
                <CardText>
                    {description}
                </CardText>
                </CardBody>
                <Button href={`/MyPlans/${name}/${id}`}>View Plan</Button>
            </Card>
         </Col>
    )
}


function formatDate(date) {
    let formatDate = new Date(date);
    let YYYY = formatDate.getFullYear();
    let MM = formatDate.getMonth() + 1;
    let DD = formatDate.getDate();
    let dayOfWeek = formatDate.getDay();
    switch (dayOfWeek) {
        case 0:
            dayOfWeek = "Sun";
            break;
        case 1:
            dayOfWeek = "Mon";
            break;
        case 2:
            dayOfWeek = "Tues";
            break;
        case 3:
            dayOfWeek = "Wed";
            break;
        case 4:
            dayOfWeek = "Thurs";
            break;
        case 5:
            dayOfWeek = "Fri";
            break;
        case 6:
            dayOfWeek = "Sat";
    }



    return `${MM}/${DD}/${YYYY} (${dayOfWeek})`
}

export default PlanCard;