import * as request from 'supertest';

import app from '../src/app';

// Todo: look up Jest setup files: https://jestjs.io/docs/en/configuration.html#setupfiles-array

describe('User Test Suite', () => {
    describe('POST /register - Create a user', () => {
        it('Returns 200 Status and User Data without Password Hash', async () => {
            // Todo: move to mock data provider
            const username = "jane";
            const password = "secret_word";
            // @ts-ignore
            const result = await request(app)
                .post('/register')
                .send({username, password})
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
            expect(result.body.data).toBeDefined();
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.createdAt).toBeDefined();
            expect(result.body.data.updatedAt).toBeDefined();
            expect(result.body.data.username).toBeDefined();
            expect(result.body.data.username).toEqual(username);
            expect(result.body.data.password).toBeUndefined();
        });

        it('Returns 400 Status if data is invalid', async () => {
            // Todo: move to mock data provider
            // @ts-ignore
            const result = await request(app)
                .post('/register')
                .send({username: 'ja', password: 'pa'})
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(400);
            expect(result.body.errors).toBeDefined();
        });

        it('Returns 400 Status if data is empty', async () => {
            // Todo: move to mock data provider
            // @ts-ignore
            const result = await request(app)
                .post('/register')
                .send({username: 'ja', password: 'pa'})
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(400);
            expect(result.body.errors).toBeDefined();
        });

        it('Returns 400 Status if data is missing', async () => {
            // Todo: move to mock data provider
            // @ts-ignore
            const result = await request(app)
                .post('/register')
                .send({})
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(400);
            expect(result.body.errors).toBeDefined();
        });
    });
});

