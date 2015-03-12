'use strict';

var Q = require('q');
var Db = require('./db');
var db = new Db();

var Controller = function () {


};

Controller.prototype.getCollection = Q.async(function* (request, response) {

    var entity = request.params.entity;

    var collection = yield db.find(entity);

    response.send(collection);

});

Controller.prototype.create = Q.async(function* (request, response) {

    var entity = request.params.entity;

    var model = yield db.insert(entity, request.body);

    response.send(model);

});

module.exports = Controller;
