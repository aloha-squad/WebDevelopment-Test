import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  //Return the tone with highest score
  getMajorTone(tones) {
    //When the list tones is empty, the tone analyzer was not capable of identifying the tone,
    //so we set tone_id as undefined
    let tone = {
      tone_id: 'undefined'
    };

    if (tones.length > 0) {
      tone = tones.reduce((a, b) => tones[a] > tones[b] ? a : b);
    }
    //Returns the id of the major tone
    return tone.tone_id;
  }

  render() {
    const tweets = this.props.tweets;
    //Enums the marker icon that represents a tone
    const TONE_ICON = {
      'anger': require('../assets/red_marker.png'),
      'fear': require('../assets/green_marker.png'),
      'joy': require('../assets/yellow_marker.png'),
      'sadness': require('../assets/blue_marker.png'),
      'analytical': require('../assets/white_marker.png'),
      'confident': require('../assets/purple_marker.png'),
      'tentative': require('../assets/marine_marker.png'),
      'undefined': require('../assets/gray_marker.png')    
    };

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
              url: TONE_ICON[this.getMajorTone(tweet.tone)]
            }}
          />
        )}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLEMAPS_API_KEY)
})(MapContainer)