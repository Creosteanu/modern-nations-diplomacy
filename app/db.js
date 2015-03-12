'use strict';

var ModelFactory = require('./modelFactory');
var modelFactory = new ModelFactory();

var Db = function () {


};


Db.prototype.find = function(entityName, query){

    var entity = modelFactory.createModel(entityName);

    return entity.find(query);

};

Db.prototype.findById = function(entityName, id){

    var entity = modelFactory.createModel(entityName);

    return entity.findById(id);

};

Db.prototype.insert = function(entityName, data){

    var entity = modelFactory.createModel(entityName);

    return entity.save(data);

};

Db.prototype.remove = function(entityName, query){

    var entity = modelFactory.createModel(entityName);

    return entity.remove(query);

};

Db.prototype.update = function(entityName, query, data){

    var entity = modelFactory.createModel(entityName);

    return entity.update(query, data, {overwrite:true});

};

module.exports = Db;