const config = require('../src/config');
const fileJSON = require('./fileJSON')

const googleMapsClient = require('@google/maps').createClient({
    key: `${config.REACT_APP_GOOGLE_KEY}`,
    Promise: Promise
});

module.exports = function main(param){

    setTimeout(function(){

        console.log(param);

        const tweetJSON = require('../src/tweets.json');
        
        tweetJSON.statuses.map(async function(i) {
            i.location = await getGeocode(i.location);
            console.log(JSON.stringify(i.location) +"\n\n\n");
        });

        function getGeocode(address) {
            return googleMapsClient.geocode({ address: address}).asPromise()
    
            .then(response => {
                let lat = response.json.results[0].geometry.location.lat;
                let lng = response.json.results[0].geometry.location.lng;
                let coord = {
                    lat,
                    lng
                }
                return coord;
            })
            
            .catch((err) => {
                console.log("Location undefinded");
                let lat = null;
                let lng = null;
                let coord = {lat, lng}
                return coord
            });
        }
    
        setTimeout(function(){
            fileJSON("write", tweetJSON, "../src/tweets");
        }, 2000);
    
    }, 1500);
}