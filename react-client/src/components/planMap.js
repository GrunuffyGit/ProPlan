import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import GoogleMaps from "./GoogleMaps";

function PlanMap(props) {   
    const [coordinates, setCoordinates] = useState([]);
    const [missing, setMissing] = useState([]);

    useEffect(()=>{
        let cArray = [];
        let mArray = [];
        props.activity.sort((act1, act2) => new Date(act1.time_start) - new Date(act2.time_start));
        for(const act of props.activity){
            if(!act.coordinates){
                mArray.push(act);
                setMissing(mArray);
            }else{
                let coordinate = act.coordinates.replace(/[()]/g,"");
                coordinate = coordinate.split(",");
                let coordinateObj = {
                    lat : parseFloat(coordinate[0]),
                    lng : parseFloat(coordinate[1])
                }
                cArray.push(coordinateObj);
                setCoordinates(cArray);
            }
        }
        setMissing(mArray);
        setCoordinates(cArray);
    },[props.activity]);
    
    if(missing.length > 0){
        return(
            <div>
                <Row>
                    <ul> The following events are missing coordinates:
                        {missing.map(activity => (<li key={activity.id}>{activity.name}</li>))}
                    </ul>
                    <p>To view your plan on the map, please select a location given by google!</p>   
                </Row>
                <Row className="invisible">
                    <div id="maps" height="0px !important"></div>
                </Row>
            </div>
        );
    }else{
        return(
            <GoogleMaps coordinates={coordinates}/>
        );
    }
}

export default PlanMap;