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
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again.";
    var http = require('http');
    var FoodTime = req.body.result.parameters.EatingTime;
    var item = "We have everything here";
    var request = require('request');
    if (req.body.result.metadata.intentName == "ShowMenu") {
        var query = 'http://alfredapi20170217032800.azurewebsites.net/api/values?query=' + FoodTime;
    }
    else if(req.body.result.metadata.intentName == "order food"){
        var OrderText= req.body.result.parameters.OrderText;
        var query = 'http://alfredapi20170217032800.azurewebsites.net/api/Order?query=' + OrderText;
    }

    request(query, function (error, response, body) {
        item = body;
        if (error) item = error;
        return res.json({
            speech: item,
            displayText: speech,
            source: 'webhook-echo-sample'
        });
    });
});

restService.get('/ss', function (req, res) {

    var request = require('request');
    var item = " ";
    var speech = " ";
    request('http://alfredapi20170217032800.azurewebsites.net/api/values?query=Lunch', function (error, response, body) {
        item = body;

        if (error) item = error;

    });


    // var db=require('node-localdb');
    // var food=db('Food.json');
    // food.insert({FoodName:'Gobi Manchuria',Type:'Starter',})

    // res.send('done');    
});