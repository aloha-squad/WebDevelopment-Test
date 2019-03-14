const expect = require('chai').expect;

const passportConfig = require('../api/twitter/config/passport-config');

describe('Test passport-config module', () => {
    it('should not be undefined', (done) => {
        expect(passportConfig).to.not.be.undefined;

        done();
    });

    it('should be a function', (done) => {
        expect(passportConfig).to.be.a('function');

        done();
    });
});