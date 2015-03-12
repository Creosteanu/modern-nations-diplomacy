'use strict';

var Q = require('q');
var Db = require('./db');

var Controller = Q.async(function*() {

    this.db = yield new Db();

});

Controller.prototype.getCollection = function (request, response) {

    var entity = request.params.resource;

    var collection = this.db.find(entity);

    response.send(collection);

};

Controller.prototype.create = function (request, response) {

    var entity = request.params.resource;

    var model = this.db.insert(entity, request.body);

    response.send(model);

};

module.exports = Controller;
