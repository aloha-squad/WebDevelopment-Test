import react from  'react';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";



function Map(){
    const [selctedPin, setSelectedPin] = useState(null);
    let custMarker = "https://image.flaticon.com/icons/svg/1364/1364892.svg";
    return(
        <GoogleMap
            defaultZoom={3}
            defaultCenter={{ lat: 20, lng: 10}}
        >               

            {tweetsJSON.statuses.map(tweets => (
                <Marker
                    // key = {tweets.username}
                    position = {{
                        lat : tweets.location.lat,
                        lng : tweets.location.lng
                    }}

                    animation = {window.google.maps.Animation.DROP}
                    icon={{
                        url: custMarker,
                        scaledSize: new window.google.maps.Size(35, 40)
                    }}              
                    
                    onClick={() => {
                        setSelectedPin(tweets);
                    }}
                    
                />
            ))}

            {selctedPin && (
                <InfoWindow 
                    position = {{
                        lat : selctedPin.location.lat,
                        lng : selctedPin.location.lng
                    }}
                    onCloseClick={() => {
                        setSelectedPin(null);
                      }}
                >
                    
                    <div>
                        <h1>{selctedPin.username}</h1>
                        <p>{selctedPin.text}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

return(
    <div style={{ width: "100vw", height: "100vh" }}>
        <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    </div>
)