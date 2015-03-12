'use strict';

var Controller = require('./controller');

function errorHandlerWrapper(toExecute) {

    return function (request, response) {

        try {

            toExecute(request, response);

        } catch (exception) {

            console.log(exception);
            response.status(400).send({error:exception});

        }

    };

}

var Router = function () {};

Router.prototype.initRoutes = function (app) {

    var controller = new Controller();

    try {

        app.get('/:entity', errorHandlerWrapper(controller.getCollection));
        app.post('/:entity', errorHandlerWrapper(controller.create));

    }
    catch (exception) {
        console.log(exception);
    }

};

module.exports = Router;