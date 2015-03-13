'use strict';

var _ = require('lodash');
var Q = require('q');
var restler = require('./harmonyRestler');

var mainTick = Q.async(function *() {

    console.log('Getting countries');
    var countries = yield restler.get('http://localhost/country');

    var maxGdp = _.max(countries, function (country) {return country.gdp;});
    maxGdp = maxGdp.pop;

    console.log('updating populations');
    for (var i = 0; i < countries.length; i++) {

        var country = countries[i];

        var gdpRange = country.gdp / maxGdp * 100;

        var popGrowth = (75 - gdpRange) / 25;

        country.pop = country.pop * (1 + popGrowth / 100);
        country.gdp = country.gdp * (1 + popGrowth / 100);

    }
});

var mainTickWithErrorHandling = Q.async(function*() {

    try {

        yield mainTick();

    } catch (exception) {

        console.log(exception);

    }

});

var CronJob = require('cron').CronJob;

var tick = new CronJob('* * * * * *', mainTickWithErrorHandling);

tick.start();