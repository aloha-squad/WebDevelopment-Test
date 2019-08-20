const express = require('express');
const app = express();
const port = 5000;
const twitter = require('./twitter')
const fileJSON = require('./fileJSON')

fileJSON("write", 
            "\{\n    \"statuses\": []\n\}",
            "../src/tweets");

app.get('/query/:hashtag', (request, response)=>{
    let req = request.params;
    
    let search = `\"#${req.hashtag}\"`;    

    twitter(search);

    response.send(search);
    console.log(search);

});

app.listen(port,()=> console.log("Server started!"));