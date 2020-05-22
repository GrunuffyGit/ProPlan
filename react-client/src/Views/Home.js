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
import map from "../images/map.png";
import plan from "../images/sport.png";
import craft from "../images/craft.png";

const Home = () => {
    return (
        <div className="App">
            <Jumbotron>
                <h1 id="welcome">Welcome to ProPlan</h1>
                <h3 id="slogan">Planning in the right direction.</h3>
            </Jumbotron>
            <h2>What is ProPlan?</h2>
            <p className="proplan-description">
                ProPlan is a platform where you can create extensive detailed itineraries. 
                Whether you are creating a schedule for an event, a work trip, or a vocation, ProPlan can help give you a better understanding of what you are trying to accomplish.
            </p>
            <h2>Features</h2>
                <Row id="featureRow">
                    <Col>
                        <Card className="homeFeature">
                            <CardBody>
                                <CardImg  className="features" top  src={plan}/>
                                <CardTitle>
                                    Create Your Plan
                                </CardTitle>
                                <CardText>
                                    Create any plans for an upcoming trip or event in your life.
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="homeFeature">
                            <CardBody>
                                <CardImg className="features" top src={map}/>
                                <CardTitle>
                                    Visualize Your Plan
                                </CardTitle>
                                <CardText>
                                    Visualize your plans on tables and maps to help you plan better.
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="homeFeature">
                            <CardBody>
                                <CardImg className="features" top src={craft}/>
                                <CardTitle>
                                    Customize Your Plan
                                </CardTitle>
                                <CardText>
                                    The ability to add multiple activities to your day to maximize time.
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
        </div>
    );
};

export default Home;