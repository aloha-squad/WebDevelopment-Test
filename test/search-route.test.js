const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = require('../server');
const request = require('supertest');

describe('Test search for hashtag route', () => {
    let query = {
        "q": "#love"
    }
    it('Should return a JSON', (done) => {
        request(app)
            .post('/api/v1/search/hashtag')
            .send(query)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});