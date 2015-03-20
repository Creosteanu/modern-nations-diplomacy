'use strict';

var _ = require('lodash');
var Q = require('q');
var restler = require('./harmonyRestler');

function getMaxGdp(countries) {

    var maxCountry = _.max(countries, function (country) {return country.gdp;});

    return maxCountry.gdp;

}

function updateGdp(countries) {

    console.log('updating gdp');

    var maxGrowth = 0.1;
    var maxGdp = getMaxGdp(countries);

    for (var i = 0; i < countries.length; i++) {

        var country = countries[i];

        var gdpRange = (maxGdp - country.gdp) / maxGdp;
        var gdpGrowth = gdpRange * maxGrowth;

        country.gdp *= (1 + gdpGrowth);

    }

}

function updatePop(countries) {

    console.log('updating population');

    var maxGrowth = 0.1;
    var minGrowth = -0.03;
    var maxGdp = getMaxGdp(countries);

    for (var i = 0; i < countries.length; i++) {

        var country = countries[i];

        var gdpRange = (maxGdp - country.gdp) / maxGdp;
        var popGrowth = gdpRange * (maxGrowth - minGrowth) + minGrowth;

        country.pop = country.pop * (1 + popGrowth);

    }

}

var getCountries = function () {

    console.log('Getting countries');

    return restler.get('http://localhost/country');

}

var saveCountries = function (countries) {

    console.log('Saving countries');

    return restler.putJson('http://localhost/country', countries);

}

var mainTick = Q.async(function *() {

    var countries = yield getCountries();


    updatePop(countries);
    //updateGdp(countries);

    yield saveCountries(countries);

});

var mainTickWithErrorHandling = Q.async(function*() {

    try {

        yield mainTick();

    } catch (exception) {

        console.log(exception);

    }

});

var CronJob = require('cron').CronJob;

var tick = new CronJob('*/3 * * * * *', mainTickWithErrorHandling);

tick.start();
