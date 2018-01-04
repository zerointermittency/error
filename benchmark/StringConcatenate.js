'use strict';

const Benchmark = require('benchmark');

/* eslint-disable no-console, no-unused-vars */
// add tests
(new Benchmark.Suite)
    .add('Template Literal', () => {
        let a = 'foo';
        a = `${a}-bar`;
    })
    .add('operate String', () => {
        let a = 'foo';
        a = a + '-bar';
    })
    .add('Concatenate String', () => {
        let a = 'foo';
        a = a.concat('-bar');
    })
    .add('add String', () => {
        let a = 'foo';
        a += '-bar';
    })
    // add listeners
    .on('cycle', (event) => {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ 'async': true });
