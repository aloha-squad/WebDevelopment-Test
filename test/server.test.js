const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = require('../server');
const request = require('supertest');

describe('Test available routes', () => {
    it('shouldnt load home page when GET /', (done) => {
        request(app)
            .get('/')
            .expect(404, done);
    });

    it('should return 404 page not found', (done) => {
        request(app)
        .get('/page/dont/exist')
        .expect(404, done);
    });
});