'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function (req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    var http = require('http');
    var response;
    var options = {
        host: 'http://alfredapi20170217032800.azurewebsites.net/api/values/Get',
        port: 80,       
    };

    http.get(options, function (resp) {
        resp.on('data', function (chunk) {
             response=resp;
        });
    }).on("error", function (e) {
        console.log("Got error: " + e.message);
    });

    return res.json({
        speech: response[0],
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});


restService.listen((process.env.PORT || 8000), function () {
    console.log("Server up and listening");
});
