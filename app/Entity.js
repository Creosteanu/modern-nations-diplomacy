'use strict';

var Q = require('q');
var _ = require('lodash');

var Entity = function (mongooseEntity) {

    this.mongooseEntity = mongooseEntity;

};


Entity.prototype.find = function (query, fields, options) {

    var deferred = Q.defer();

    this.mongooseEntity.find(query, fields, options).lean().exec(function (err, data) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    });

    return deferred.promise;

};

Entity.prototype.findOne = function (query, options) {

    var deferred = Q.defer();

    this.mongooseEntity.findOne(query, null, options).lean().exec(function (err, data) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    });

    return deferred.promise;

};

Entity.prototype.findById = function (id) {

    var deferred = Q.defer();
    var modelName = this.mongooseEntity.modelName;

    this.mongooseEntity.findById(id).lean().exec(function (err, data) {
        if (err) {
            deferred.reject(err);
        } else if (!data || _.isEmpty(data)) {
            deferred.reject('inexistent ' + modelName);
        } else {
            deferred.resolve(data);
        }
    });

    return deferred.promise;

};

Entity.prototype.count = function (query) {

    var deferred = Q.defer();

    this.mongooseEntity.count(query, function (err, count) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(count);
        }
    });

    return deferred.promise;

};

Entity.prototype.save = function (data) {

    var deferred = Q.defer();

    new this.mongooseEntity(data).save(function (err, entity) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(entity);
        }
    });

    return deferred.promise;

};

Entity.prototype.remove = function (query) {

    var deferred = Q.defer();

    this.mongooseEntity.remove(query, function (err) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;

};

Entity.prototype.update = function (query, data, options) {

    var deferred = Q.defer();

    this.mongooseEntity.update(query, data, options, function (err, raw, numAffected) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(numAffected);
        }
    });

    return deferred.promise;

};

Entity.prototype.distinct = function (field, query) {

    var deferred = Q.defer();

    this.mongooseEntity.distinct(field, query, function (err, result) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(result);
        }
    });

    return deferred.promise;

};


Entity.prototype.getSchema = function () {

    return this.mongooseEntity.schema;

};


module.exports = Entity;