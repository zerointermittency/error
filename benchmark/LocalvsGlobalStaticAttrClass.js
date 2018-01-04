'use strict';

const Benchmark = require('benchmark');

/* eslint-disable no-console, no-unused-vars */
class localAttr {
    static get levels() {
        return {
            fatal: 'fatal',
            error: 'error',
            warning: 'warning',
        };
    }
}
const levels = {
    fatal: 'fatal',
    error: 'error',
    warning: 'warning',
};
class globalAttr {
    static get levels() {
        return levels;
    }
}

(new Benchmark.Suite)
    .add('local static attrs', () => {
        localAttr.levels;
    })
    .add('global static attrs', () => {
        globalAttr.levels;
    })
    .on('cycle', (event) => {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });