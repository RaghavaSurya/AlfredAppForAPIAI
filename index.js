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
    var item;
    var FoodTime = req.body.result.parameters.EatingTime;    

    var sql=require('mssql');

    //configuring alfredapi database
    var config={
            user : 'AlfredAdmin',
            password:'@lfred123',
            server:'alfredapi.database.windows.net',
            database:'AlfredDatabase'
    };

    //connect to database
    sql.connect(config,function(err){
        if(err) console.log(err);

        //create request object
        var request=new sql.Request();

        //query to AlfredDatabase
        request.query('select * from Food where FoodTime='+FoodTime,function(err,recordset){
           
            recordset.forEach(function(element) {
                item += element.Name;
            }, this);

        });
    })  ;  


    return res.json({
        speech: item ,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});


restService.listen((process.env.PORT || 8000), function () {
    console.log("Server up and listening");
});
