module.exports =  function fileJSON(operation, text, fileName){
    let json;

    if (typeof text === "string") {
        json = text;
    } else json = JSON.stringify(text, null, 4);

    let fs = (require('fs'));
    
    if (operation === "write") {
        fs.writeFile(`${fileName}.json`, json, function(err, result) {
            if(err) console.log('error', err);
        });
    } else {
        fs.appendFile(`${fileName}.json`, json, function(err, result) {
            if(err) console.log('error', err);
        });
    }
}
