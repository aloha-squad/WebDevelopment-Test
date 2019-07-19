(function () {
    $('#tweetsSearch').on('submit', function (event) {
        event.preventDefault();
        // let formData = $('#tweetsSearch').serializeArray();

        $.ajax({
            url: this.action,
            type: 'post',
            data: $(this).serialize(),
            success: function (data, textStatus) {
                console.log(data);
                let listTweets = data.success.statuses;

                let cardBody = function () {
                    var htmlTable = '';
                    for (var key in listTweets) {
                        htmlTable += '<li><div class="tweet-content"><img src="' + listTweets[key].user.profile_image_url_https + '" alt="">' +
                            '<label class="screenName">@' + listTweets[key].user.screen_name + '</label>' +
                            '<label class="screenName">' + listTweets[key].user.location + '</label>' +
                            '<p>' + listTweets[key].full_text + '</p>'
                        '</li>';
                        getGeo(listTweets[key].user.location);
                    }
                    return htmlTable;
                }
                document.getElementById('cardTweets').innerHTML = cardBody(); 
            },
            error: function (data) {
                console.warn(data.error);
            }
        })
    });
})();

function getGeo(location) {
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
                console.log(data.results[0].geometry.location);
                addMarkers(data.results[0].geometry.location, 'user1');
            },
            error: function (data) {
                console.warn(data.error);
            }
        });
    }
}

function addMarkers(markerPosition, userName) {
    // Adding and custom markers
    var marker = new google.maps.Marker({
        position: markerPosition,
        map: map,
        title: 'Clique para abrir',
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png'
    });

    var infoWindow = new google.maps.InfoWindow({
        content: '<h3>' + userName + '</h3>'
    });

    marker.addListener('click', function (e) {
        infoWindow.open(map, marker);
    })
}

function watsonAnalyze(){
    // Watson Test
    $.ajax({
        url: '/watson/analyze',
        type: 'post',
        data: {text: `Hi I'm Caio Americo and I like to draw a lot in my agenda.`},
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.warn(data.error);
        }
    })
}