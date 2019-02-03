import * as request from 'supertest';

import app from "../src/app";

describe('GET / - a root api endpoint', () => {
    it('Returns 200 status and Message', async (done) => {
        const result = await request(app).get('/');
        expect(result.statusCode).toEqual(200);
        expect(result.body.message).toEqual('Hello World!');
        done();
    });
});