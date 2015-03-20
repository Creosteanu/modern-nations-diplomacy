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

        app.get('/:entity', errorHandlerWrapper(controller.find));
        app.post('/:entity', errorHandlerWrapper(controller.insert));
        app.get('/:entity/:_id', errorHandlerWrapper(controller.findById));
        app.put('/:entity', errorHandlerWrapper(controller.replace));
        app.put('/:entity/:_id', errorHandlerWrapper(controller.update));
        app.delete('/:entity', errorHandlerWrapper(controller.remove));

    }
    catch (exception) {
        console.log(exception);
    }

};

module.exports = Router;