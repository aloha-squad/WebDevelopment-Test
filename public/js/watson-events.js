// Class to get the data from the Watson Api, do  logics related of Watson and your consequences
var WatsonApi = {
    // Get data from Api and create a sessionStorage of tweet
    watsonAnalyze: function (idTweet,textTweet) {
        if (textTweet != '' || textTweet != null) {
            console.log('watson analizando')
            $.ajax({
                url: '/watson/analyze',
                type: 'post',
                data: {
                    text: `` + textTweet
                },
                success: function (data) {
                    data.success.idTweet = idTweet;
                    sessionStorage.setItem(idTweet, JSON.stringify(data));

                    WatsonApi.drawAnalyctics(data);
                },
                error: function (data) {
                    console.warn(data.error);
                }
            })
        }
    },
    // Check if the tweet already has a analytics
    checkStorageAnalytics: function (idTweet){
        dataStorage = sessionStorage.getItem(idTweet);

        if(dataStorage != null)
            return JSON.parse(dataStorage);
        else
            return false;
    },
    // Draw in the watson session the results
    drawAnalyctics: function(watsonData){
        console.log(watsonData);
        let watsonEmotions = watsonData.success.emotion.document.emotion;

       
        $('#card-angry').val((watsonEmotions.anger * 100).toFixed(2) + "%")
        $('#card-disgust').val((watsonEmotions.disgust * 100).toFixed(2) + "%")
        $('#card-fear').val((watsonEmotions.fear * 100).toFixed(2) + "%")
        $('#card-joy').val((watsonEmotions.joy * 100).toFixed(2) + "%")
        $('#card-sadness').val((watsonEmotions.sadness * 100).toFixed(2) + "%")
    }
};