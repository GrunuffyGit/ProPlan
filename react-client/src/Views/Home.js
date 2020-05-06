import React from "react";
import { 
    Jumbotron, 
    Card,
    CardImg, 
    CardTitle, 
    CardText, 
    CardBody, 
    Row,
    Col} from "reactstrap";
// import { Spinner } from 'reactstrap';
// import { useAuth0 } from "../react-auth0-spa";
// const { loading } = useAuth0();

const Home = () => {
    // if(loading){
    //     return(
    //         <Spinner />
    //     );
    // }
    return (
        <div className="App">
            <Jumbotron>
                <h1>Welcome to ProPlan</h1>
                <h3>Planning in the right direction.</h3>
            </Jumbotron>
            <h2>What is Proplan?</h2>
            <p className="proplan-description">
                ProPlan is a platform where you can create extensive detailed itineraries. 
                Whether you are creating a schedule for an event, a work trip, or a vocation, ProPlan can help give you a better understanding of what you are trying to accomplish.
            </p>
            <h2>Features</h2>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardImg top  src="https://i.pinimg.com/originals/5c/33/ae/5c33ae63a4afea29b7f7744925995202.jpg"/>
                                <CardTitle>
                                    Feature 1
                                </CardTitle>
                                <CardText>
                                    cardtext
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardImg top src="https://i.pinimg.com/originals/5c/33/ae/5c33ae63a4afea29b7f7744925995202.jpg"/>
                                <CardTitle>
                                    Feature 2
                                </CardTitle>
                                <CardText>
                                    cardtext
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardImg top src="https://i.pinimg.com/originals/5c/33/ae/5c33ae63a4afea29b7f7744925995202.jpg"/>
                                <CardTitle>
                                    Feature 3
                                </CardTitle>
                                <CardText>
                                    cardtext
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
        </div>
    );
};

export default Home;