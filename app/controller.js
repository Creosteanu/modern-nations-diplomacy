'use strict';

var Q = require('q');
var Db = require('./db');
var db = new Db();

var Controller = function () {


};

Controller.prototype.find = Q.async(function* (request, response) {

    var entity = request.params.entity;

    var collection = yield db.find(entity);

    response.send(collection);

});

Controller.prototype.insert = Q.async(function* (request, response) {

    var entity = request.params.entity;
    var data = request.body;

    var model = yield db.insert(entity, data);

    response.send(model);

});

Controller.prototype.findById = Q.async(function* (request, response) {

    var entity = request.params.entity;
    var _id = request.params._id;

    var model = yield db.findById(entity, _id);

    response.send(model);

});

Controller.prototype.remove = Q.async(function* (request, response) {

    var entity = request.params.entity;
    var _id = request.params.id;

    var model = yield db.remove(entity, {_id: _id});

    response.send(model);

});

Controller.prototype.update = Q.async(function* (request, response) {

    var entity = request.params.entity;
    var _id = request.params.id;
    var data = request.body;

    yield db.update(entity, {_id: _id}, data);

    response.send(data);

});

module.exports = Controller;
