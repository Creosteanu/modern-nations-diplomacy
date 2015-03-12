'use strict';

var mongoose = require('mongoose');
var Entity = require('./entity');

function mongooseConnect() {

    var connectionUrl = 'mongodb://root@localhost:27017/modernNationsDiplomacy';
    var mongooseConfig = {
        server: {
            poolSize:      10,
            socketOptions: {
                keepAlive: 1
            }
        },
        db:     {
            numberOfRetries:  10,
            retryMiliSeconds: 1000
        }
    };

    mongoose.connect(connectionUrl, mongooseConfig);

}

var ModelFactory = function () {

    mongooseConnect();

    this.models = {};

};

ModelFactory.prototype.createModel = function (modelName) {

    if (!this.models[modelName]) {
        this.models[modelName] = mongoose.model(modelName, new mongoose.Schema({}, {strict: false}));
    }

    return new Entity(this.models[modelName]);

};


module.exports = ModelFactory;