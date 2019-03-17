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
    let url = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7C";

    let tone = this.getMajorTone(tones);

    switch (tone.tone_id) {
      case 'anger':
        return url + "FF0000";
      case 'fear':
        return url + "00FF00";
      case 'joy':
        return url + "FFFF00";
      case 'sadness':
        return url + "0000FF";
      case 'analytical':
        return url + "FFFFFF";
      case 'confident':
        return url + "FF00FF";
      case 'tentative':
        return url + "00FFFF";
      default:
        return url + "BBBBBB";
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


