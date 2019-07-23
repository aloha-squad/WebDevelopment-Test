var searchTerm;

(function () {
    'use strict';

    $('#tweetsSearch').on('submit', function (event) {
        event.preventDefault();

        //Storage Search Term to future uses
        searchTerm = $(this).serializeArray()[1].value;

        $.ajax({
            url: this.action,
            type: 'post',
            data: $(this).serialize(),
            success: function (data) {
                // console.log(data);
                let listTweets = data.success.statuses;

                $('.tweets-result').html('<small>Foram encontrados <strong>' + listTweets.length + '</strong> tweets</small>')

                let cardBody = function () {
                    var htmlTable = '';
                    for (var key in listTweets) {
                        htmlTable += '<li class="tweet-list" data-id="' + listTweets[key].id + '" data-user="' + listTweets[key].user.screen_name + '" data-lat="" data-lng="">' +
                            '<div class="tweet-content"><img src="' + listTweets[key].user.profile_image_url_https + '" alt="">' +
                            '<div class="tweet-info"><label class="screenName left"><strong>@' + listTweets[key].user.screen_name + '</strong></label>' +
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

        if (!watsonData) {
            WatsonApi.watsonAnalyze(idToWatson, textToWatson);
        } else {
            WatsonApi.drawAnalyctics(watsonData);
        }
    });

    // When analyze button press initialize the watson-events.js logics
    $(document).ready(function () {
        WatsonApi.getRanking();
    });
})();

// Api Google GeoCode to transform the text location in a lat and long, add to tweet the lat and lng for other interations if necessary
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
                if (data.results.length > 0) {
                    addMarkers(data.results[0].geometry.location, ('@' + userName));
                    $('.tweet-list[data-user="' + userName + '"]').attr({
                        'data-lat': data.results[0].geometry.location.lat,
                        'data-lng': data.results[0].geometry.location.lng
                    })
                }
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
        content: '<h4>' + userName + '</h4><small>#' + searchTerm + '</small>'
    });

    marker.addListener('click', function (e) {
        infoWindow.open(map, marker);
    })
}

function tweetsEvent() {
    // General Setup -  Events Tweets to watson section
    $('.tweet-list').on('click', function () {
        $('.tweet-list').removeClass("tweet-selected");
        $(this).addClass("tweet-selected");
        $('#tweet-highlight').text('"' + $(this).find(".tweet-text").text() + '"');
        $('#watsonText').val($(this).find(".tweet-text").text());
        $('#watsonText').attr('data-id', $(this).attr('data-id'));

        //move map to pin position of the select user
        if ($(this).attr('data-lat') != "" && $(this).attr('data-lng') != "") {
            changePosMaps($(this).attr('data-lat'), $(this).attr('data-lng'))
        }
    });
}

function changePosMaps(lat, lng) {
    // Use variable Map to change lat and Lng on click Tweet
    map.panTo(new google.maps.LatLng(lat, lng));
}

// Start Carousel Ranking and setup
function carouselRanking() {
    $(".owl-carousel").owlCarousel({
        loop: true,
        // nav: true,
        center: true,
        margin: 10,
        items: 1,
        autoplay: true,
        autoplayTimeout: 15000,
        autoplayHoverPause: true
    });
}

// Menu to filter and show the ranking
function selectRanking(category,element){
    $('.categories-btn .btn').removeClass('selected');
    $(element).addClass('selected');
    $('.ranking-carousel').addClass('owl-hidden');
    $('.ranking-carousel[data-ranking="'+category+'"]').removeClass('owl-hidden');
}