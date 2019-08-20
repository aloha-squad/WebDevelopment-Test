import React, { Component, useState } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import * as tweetsJSON from './tweets.json'
import SearchContainer from './components/SearchContainer'
import { Header, HeaderName } from 'carbon-components-react'

// let tweetsJSON = require('../tweets.json')
let config = require('./config');

firebase.initializeApp(config.firebaseConfig);

console.log(tweetsJSON)

function Map(){
    const [selctedPin, setSelectedPin] = useState(null);
    let custMarker = "https://image.flaticon.com/icons/svg/1364/1364892.svg";
    const defaultMapOptions = {
        fullscreenControl: false,
        mapTypeControl: false
      };
    return(
        
        <GoogleMap
            defaultZoom = {2}
            defaultCenter = {{ lat: 20, lng: -40}}
            mapTypeControl = {"false"}
            defaultOptions = {defaultMapOptions}
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

class App extends Component {
    
    state = { isSignedIn: false }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }
    
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
        })
    }
    
    render() {
        return (
            <div className = "container">
                <Header aria-label="">
                    <HeaderName href="#" prefix="">
                        Twitter Map
                    </HeaderName>
                </Header>
                <div style={{position: 'absolute', zIndex: 1, paddingTop: 48}}>
                <SearchContainer/>
                </div>
                <div className="App">
                    {this.state.isSignedIn ? (
                        <div style={{ width: "100vw", height: "100vh" }}>
                            <MapWrapped
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.REACT_APP_GOOGLE_KEY}`}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </div>
                    ) : (
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    )}
                </div>
            </div>
                    
        );
    }
}
            
export default App;
