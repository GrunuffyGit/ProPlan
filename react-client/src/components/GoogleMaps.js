import React, { useEffect } from "react";

function GoogleMaps(props){
    console.log(props);
    useEffect(()=>{
        if(document.getElementById("maps")){
            if(!document.getElementById("googleMap")){
                let mapScript = document.createElement("script");
                mapScript.setAttribute("id", "googleMap");
                mapScript.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyDGIqrmEwxioFjnhDaLB2APuMDenBqXkOk&libraries=places&callback=initMap");
                let body = document.getElementsByTagName('body')[0];
                body.appendChild(mapScript);
            }
        }
        window.initMap = initMap;
    });

    useEffect(()=>{
        let google = window.google;
        if(google){
            let map = new google.maps.Map(document.getElementById('maps'), {
                zoom: 15,
                center: props.coordinates[0]
            });
            let line = new google.maps.Polyline({
                path: props.coordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            let marker = props.coordinates.map((location, index) =>{
                let label = index +1;
                return new google.maps.Marker({
                    position: location, 
                    label: label.toString(),
                    map: map 
                }); 
            });
    
            line.setMap(map);
            google.maps.event.trigger(map, 'resize');
        }   
    },[props.coordinates]);

    function initMap() {
        let google = window.google;
        let map = new google.maps.Map(document.getElementById('maps'), {
          zoom: 15,
          center: props.coordinates[0]
        });

        let line = new google.maps.Polyline({
          path: props.coordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        let marker = props.coordinates.map((location, index)=>{
            let label = index +1;
            return new google.maps.Marker({
                position: location,
                label: label.toString(), 
                map: map}); 
        });

        line.setMap(map);
    }

    return(
        <div id="maps"></div>
    );
}

export default GoogleMaps;