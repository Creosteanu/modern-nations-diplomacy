'use strict';

var Q = require('q');
var ModelFactory = require('./modelFactory');

var Db = Q.async(function *() {

    this.modelFactory = yield new ModelFactory();

});


Db.prototype.find = function(entityName, query){

    var entity = this.modelFactory.createModel(entityName);

    return entity.find(query);

};

Db.prototype.findById = function(entityName, id){

    var entity = this.modelFactory.createModel(entityName);

    return entity.findById(id);

};

Db.prototype.insert = function(entityName, data){

    var entity = this.modelFactory.createModel(entityName);

    return entity.save(data);

};

Db.prototype.remove = function(entityName, query){

    var entity = this.modelFactory.createModel(entityName);

    return entity.remove(query);

};

Db.prototype.update = function(entityName, query, data){

    var entity = this.modelFactory.createModel(entityName);

    return entity.update(query, data);

};

module.exports = Db;