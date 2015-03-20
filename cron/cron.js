'use strict';

var _ = require('lodash');
var Q = require('q');
var restler = require('./harmonyRestler');

function getMaxGdpPerC(countries) {

    var maxCountry = _.max(countries, function (country) {return country.gdp / country.pop;});

    return maxCountry.gdp / maxCountry.pop;

}

function updateMil(countries) {

    console.log('updating mil');

    var growth = 0.1;

    for (var i = 0; i < countries.length; i++) {

        var country = countries[i];

        var maxMil = country.gdp / 100;

        if (country.mil < maxMil) {
            country.mil *= (1 + growth);
        }

        if (country.mil > maxMil) {
            country.mil = maxMil;
        }

    }

}

function updateGdp(countries) {

    console.log('updating gdp');

    var maxGrowth = 0.1;
    var maxGdpPerC = getMaxGdpPerC(countries);

    for (var i = 0; i < countries.length; i++) {

        var country = countries[i];

        var gdpPerC = country.gdp / country.pop;
        var gdpRange = (maxGdpPerC - gdpPerC) / maxGdpPerC;
        var gdpGrowth = gdpRange * maxGrowth;

        country.gdp *= (1 + gdpGrowth);

    }

}

function updatePop(countries) {

    console.log('updating population');

    var maxGrowth = 0.1;
    var minGrowth = -0.03;
    var maxGdpPerC = getMaxGdpPerC(countries);

    for (var i = 0; i < countries.length; i++) {

        var country = countries[i];

        var gdpPerC = country.gdp / country.pop;
        var gdpRange = (maxGdpPerC - gdpPerC) / maxGdpPerC;
        var popGrowth = gdpRange * (maxGrowth - minGrowth) + minGrowth;

        country.pop *= (1 + popGrowth);

    }

}

function getCountryById(countries, id) {

    return countries.find(function (country) {return country._id === id;});

}

function applyFreeTrade(countries, treaties) {


}

function applyFreeWorkers(countries, treaties) {

    var maxMigration = 0.01;
    var efficiencyGrowth = 0.01;
    var maxEfficiencyGrowth = 0.05;

    var affectedCountries = {};

    treaties.forEach(function (treaty) {

        var sender = getCountryById(countries, treaty.senderId);
        var receiver = getCountryById(countries, treaty.receiverId);

        var emigrationCountry;
        var imigrationCountry;
        var emigrationGdpPerC;
        var imigrationGdpPerC;

        var senderGdpPerC = sender.gdp / sender.pop;
        var receiverGdpPerC = receiver.gdp / receiver.pop;

        if (senderGdpPerC < receiverGdpPerC) {
            emigrationCountry = sender;
            imigrationCountry = receiver;
            emigrationGdpPerC = senderGdpPerC;
            imigrationGdpPerC = receiverGdpPerC;
        } else {
            emigrationCountry = receiver;
            imigrationCountry = sender;
            emigrationGdpPerC = receiverGdpPerC;
            imigrationGdpPerC = senderGdpPerC;
        }

        var migrationPercentage = (imigrationGdpPerC - emigrationGdpPerC) / imigrationGdpPerC;
        var migrationAbsolute = emigrationCountry.pop * migrationPercentage * maxMigration;

        emigrationCountry.pop -= migrationAbsolute;
        emigrationCountry.gdp -= migrationAbsolute * emigrationGdpPerC;
        imigrationCountry.pop += migrationAbsolute;
        imigrationCountry.gdp += migrationAbsolute * imigrationGdpPerC;

        if (!affectedCountries[emigrationCountry._id] || affectedCountries[emigrationCountry._id] < maxEfficiencyGrowth) {

            affectedCountries[emigrationCountry._id] += efficiencyGrowth;
            emigrationCountry.gdp *= (1 + efficiencyGrowth);

        }

        if (!affectedCountries[imigrationCountry._id] || affectedCountries[imigrationCountry._id] < maxEfficiencyGrowth) {

            affectedCountries[imigrationCountry._id] += efficiencyGrowth;
            imigrationCountry.gdp *= (1 + efficiencyGrowth);

        }

    });

}

function applyTreaties(countries, treaties) {

    console.log('Applying treaties');

    var freeTrade = _.filter(treaties, function (treaty) {return treaty.type === 'freeTrade';});
    var freeWorkers = _.filter(treaties, function (treaty) {return treaty.type === 'freeWorkers';});

    applyFreeTrade(countries, freeTrade);
    applyFreeWorkers(countries, freeWorkers);

}

var getTreaties = function () {

    console.log('Getting treaties');

    return restler.get('http://localhost/treaty');

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
    updateGdp(countries);
    updateMil(countries);

    var treaties = yield getTreaties();
    applyTreaties(countries, treaties);

    yield saveCountries(countries);

    console.log('==================');

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
