'use strict';

const chai = {
        expect: require('chai').expect,
    },
    NError = require('../NError.js');

it('success check attrs', () => {
    let ne1 = new NError({
            message: 'test1',
            code: 1,
            level: NError.level.error,
        }),
        ne2 = new NError({
            message: 'test2',
            code: 2,
            level: NError.level.warning,
        }),
        ne3 = new NError({
            prefix: 'test',
            message: 'test3',
            name: 'test',
            code: 3,
            level: NError.level.warning,
            extra: {a: 'alksdjksadhk'},
        }),
        ne4 = new NError({
            message: 'test4',
            code: 4,
            level: NError.level.fatal,
            error: new Error('Fatal 4'),
        });

    // ne1
    chai.expect(ne1.message).to.be.equal('test1');
    chai.expect(ne1.code).to.be.equal(1);
    chai.expect(ne1.level).to.be.equal('error');

    // ne2
    chai.expect(ne2.message).to.be.equal('test2');
    chai.expect(ne2.code).to.be.equal(2);
    chai.expect(ne2.level).to.be.equal('warning');

    // ne3
    chai.expect(ne3.message).to.be.equal('test: test3');
    chai.expect(ne3.code).to.be.equal(3);
    chai.expect(ne3.level).to.be.equal('warning');

    // ne4
    chai.expect(ne4.message).to.be.equal('Fatal 4');
    chai.expect(ne4.code).to.be.equal(4);
    chai.expect(ne4.level).to.be.equal('fatal');
});

it('Capture Error', () => {
    let levelRequired = () => new NError({level: 'asdf'}),
        coreRequired = () => new NError({
            level: NError.level.fatal,
        }),
        extraObject = () => new NError({
            code: 1,
            level: NError.level.fatal,
            extra: 'error',
        });
    chai.expect(levelRequired).to.throw('invalid level "asdf"');
    chai.expect(coreRequired).to.throw('code is required');
    chai.expect(extraObject).to.throw('extra must be "Object"');
});