'use strict';

var rest = require('restler');
var Q = require('q');

var harmonyRestler = {

};

harmonyRestler.get = function(url, options) {

	var deferred = Q.defer();

	rest.get(url, options).on('timeout', deferred.reject)
		.on('success', deferred.resolve).on('fail', deferred.reject).on('error', deferred.reject);

	return deferred.promise;

};

harmonyRestler.delete = function(url, options) {

	var deferred = Q.defer();

	rest.del(url, options).on('timeout', deferred.reject)
		.on('success', deferred.resolve).on('fail', deferred.reject).on('error', deferred.reject);

	return deferred.promise;

};

harmonyRestler.post = function(url, data, options) {

	var deferred = Q.defer();

	rest.post(url, data, options).on('timeout', deferred.reject)
		.on('success', deferred.resolve).on('fail', deferred.reject).on('error', deferred.reject);

	return deferred.promise;

};

harmonyRestler.postJson = function(url, json, options) {

	var deferred = Q.defer();

	rest.postJson(url, json, options).on('timeout', deferred.reject)
		.on('success', deferred.resolve).on('fail', deferred.reject).on('error', deferred.reject);

	return deferred.promise;

};
harmonyRestler.put = function(url, data, options) {

	var deferred = Q.defer();

	rest.put(url, data, options).on('timeout', deferred.reject)
		.on('success', deferred.resolve).on('fail', deferred.reject).on('error', deferred.reject);

	return deferred.promise;

};

harmonyRestler.putJson = function(url, json, options) {

	var deferred = Q.defer();

	rest.putJson(url, json, options).on('timeout', deferred.reject)
		.on('success', deferred.resolve).on('fail', deferred.reject).on('error', deferred.reject);

	return deferred.promise;

};


module.exports = harmonyRestler;