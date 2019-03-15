import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        return (
            <Map google={this.props.google}
                zoom={14}
                initialCenter={{
                    //Presidente Prudente coords
                    lat: -22.1276,
                    lng: -51.3856
                }}
            >

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>Info</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyC1Ptx1JeOiTABVVnuMX7cW7MAvK136tT4")
})(MapContainer)
