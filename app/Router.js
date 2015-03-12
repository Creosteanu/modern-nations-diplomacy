'use strict';

var Controller = require('./controller');
var controller = new Controller();

var Router = function () {};

Router.prototype.initRoutes = function (app) {

    app.get('/:resource', controller.getCollection);

};

module.exports = Router;