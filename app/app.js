'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var compression = require('compression');
var multer = require('multer');
var errorHandler = require('errorhandler');
var cors = require('cors');
var corsOptions = {
    origin:  '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
};


var app = express();

app.use(cors(corsOptions));
app.set('port', 80);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '15mb'}));
app.use(multer());
app.use(compression());
app.use(errorHandler());

app.listen(app.get('port'), function () {
    console.log('Started server on ' + app.get('port'));
});