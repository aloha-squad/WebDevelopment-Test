(function () {
    'use strict';

    $('#tweetsSearch').on('submit', function (event) {
        event.preventDefault();
        
        $.ajax({
            url: this.action,
            type: 'post',
            data: $(this).serialize(),
            success: function (data) {
                console.log(data);
                let listTweets = data.success.statuses;

                $('.tweets-result').html('<small>Foram encontrados <strong>' + listTweets.length + '</strong> tweets</small>')

                let cardBody = function () {
                    var htmlTable = '';
                    for (var key in listTweets) {
                        htmlTable += '<li class="tweet-list" data-id="'+ listTweets[key].id +'"><div class="tweet-content"><img src="' + listTweets[key].user.profile_image_url_https + '" alt="">' +
                            '<div class="tweet-info"><label class="screenName left">@' + listTweets[key].user.screen_name + '</label>' +
                            '<label class="screenName right">' + listTweets[key].user.location + '</label></div>' +
                            '<p class="tweet-text">' + listTweets[key].full_text + '</p>'
                        '</li>';
                        getGeo(listTweets[key].user.location, listTweets[key].user.screen_name);
                    }
                    return htmlTable;
                }
                document.getElementById('cardTweets').innerHTML = cardBody();
                tweetsEvent();
            },
            error: function (data) {
                console.warn(data.error);
            }
        })
    });

    // When analyze button press initialize the watson-events.js logics
    $('#watsonAnalyzeBtn').on('click', function () {
        let idToWatson = $('#watsonText').attr('data-id');
        let textToWatson = $('#watsonText').val();
        let watsonData = WatsonApi.checkStorageAnalytics(idToWatson);

        if(!watsonData){
            WatsonApi.watsonAnalyze(idToWatson,textToWatson);
        }
        else{
            WatsonApi.drawAnalyctics(watsonData);
        }
    })
})();

// Api Google GeoCode to transform the text location in a lat and long
function getGeo(location, userName) {
    if (location == null || location == '') {
        return true;
    } else {
        data = {
            address: location,
            key: 'AIzaSyBfgH-VXQ1NnmhBwIi68sATUGcxXTdhrHI'
        }

        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            data: data,
            success: function (data) {
                // console.log(data);

                if (data.results.length > 0)
                    addMarkers(data.results[0].geometry.location, ('@' + userName));
            },
            error: function (data) {
                console.warn(data.error);
            }
        });
    }
}

// Create markers in Google Maps based on Geo Location Api Result of tweets users
function addMarkers(markerPosition, userName) {
    // Adding and custom markers
    var marker = new google.maps.Marker({
        position: markerPosition,
        map: map,
        title: 'Clique para abrir',
        icon: '/images/pin.png'
    });

    var infoWindow = new google.maps.InfoWindow({
        content: '<h3>' + userName + '</h3>'
    });

    marker.addListener('click', function (e) {
        infoWindow.open(map, marker);
    })
}

function tweetsEvent() {
    // General Setup -  Events Tweets
    $('.tweet-list').on('click', function () {
        $('.tweet-list').removeClass("tweet-selected");
        $(this).addClass("tweet-selected");
        $('#tweet-highlight').text('"'+$(this).children(".tweet-text").text()+'"');
        $('#watsonText').val($(this).children(".tweet-text").text());
        $('#watsonText').attr('data-id', $(this).attr('data-id'));
    });
}