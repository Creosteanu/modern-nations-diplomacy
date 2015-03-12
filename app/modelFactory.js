'use strict';

var Q = require('q');
var mongoose = require('mongoose');
var Entity = require('./entity');

function mongooseConnect() {

    var deferred = Q.defer();

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

    mongoose.connect(connectionUrl, mongooseConfig, function (err) {

        if (err) {

            deferred.reject(err);

        } else {

            deferred.resolve();

        }

    });

    return deferred.promise;

}

var ModelFactory = Q.async(function *() {

    yield mongooseConnect();

});

ModelFactory.prototype.createModel = function (modelName) {

    var mongooseModel=  mongoose.model(modelName, new mongoose.Schema({}, {strict: false}));

    return new Entity(mongooseModel);

};


module.exports = ModelFactory;