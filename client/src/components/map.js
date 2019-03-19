import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

  /*
  * icons url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7CFFFF42"
  *
  * tone => color
  * anger (red) FF0000
  * fear (green) 00FF00
  * joy (yellow) FFFF00
  * sadness (blue) 0000FF
  * analytical (white) FFFFFF
  * confident (purple) FF00FF
  * tentative (marine) 00FFFF
  * undefined (gray) BBBBBB
  */
  getMarkerToned(tones) {
    //let url = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7C";

    let tone = this.getMajorTone(tones);

    switch (tone.tone_id) {
      case 'anger':
        return require('../assets/red_marker.png');
      case 'fear':
        return require('../assets/green_marker.png');
      case 'joy':
        return require('../assets/yellow_marker.png');
      case 'sadness':
        return require('../assets/blue_marker.png');
      case 'analytical':
        return require('../assets/white_marker.png');
      case 'confident':
        return require('../assets/purple_marker.png');
      case 'tentative':
        return require('../assets/marine_marker.png');
      default:
        return require('../assets/gray_marker.png');
    }
  }

  //Return the tone with highest score or empty otherwise
  getMajorTone(tones) {
    let tone = {};

    if (tones.length > 0) {
      tone = tones.reduce((a, b) => tones[a] > tones[b] ? a : b);
    }

    return tone;
  }

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
          <Marker key={tweet.id} position={tweet.coordinates}
            icon={{
              url: this.getMarkerToned(tweet.tone)
            }}
          />
        )}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyC1Ptx1JeOiTABVVnuMX7cW7MAvK136tT4")
})(MapContainer)


