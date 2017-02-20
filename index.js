'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();
var port = process.env.PORT || 8000;
restService.listen(port);
console.log(port);
console.log("Server up and listening");

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function (req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    var http = require('http');
    var item = "CocaCola";
    var FoodTime = req.body.result.parameters.EatingTime;
    return res.json({
        speech: item,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});

restService.get('/ss', function (req, res) {

    var sql = require('mssql');
    var config = {
        userName: 'AlfredAdmin',
        password: '@lfred123',
        server: 'alfredapi.database.windows.net',     
        // If you are on Microsoft Azure, you need this:  
        options: { encrypt: true, database: 'AlfredDatabase' }
    };
    
    sql.connect(config,function(err){

        if(err) res.send(err);

        var request=new sql.Request();

        request.query('Select * from Food',function(err,recordSet){

            if(err) res.send(err);
            res.send(recordSet);
        })
    })
})




