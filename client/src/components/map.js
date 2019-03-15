import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        const tweets = this.props.tweets;

        return (
            <Map google={this.props.google}
                zoom={3}
                initialCenter={{
                    //Presidente Prudente coords
                    lat: -22.1276,
                    lng: -51.3856
                }}>
                {tweets.map((tweet) =>
                    <Marker key={tweet.id} position={tweet.coordinates} />
                )}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyC1Ptx1JeOiTABVVnuMX7cW7MAvK136tT4")
})(MapContainer)
