import * as request from 'supertest';
import model from "../src/model";
import app from "../src/app";
import {authFailGet, login} from "./utility";

// Todo: look up Jest setup files: https://jestjs.io/docs/en/configuration.html#setupfiles-array

// Todo: Some clues here regarding async hang up: https://github.com/visionmedia/supertest/issues/520


describe('Auth Test Suite', () => {

    describe('POST /login - Login a user', () => {

        const username = 'jimbo';
        const password = 'too_secret';

        beforeAll(async () => {
            await model.user.create({username, password})
        });

        it('Returns 200 Status and User Data without Password Hash', async () => {
            // @ts-ignore
            const result = await request(app)
                .post('/login')
                .send({username, password})
                .set('Accept', 'application/json');

            // Todo: Check for cookie details
            // Todo: Look into SuperAgent auth testing

            expect(result.statusCode).toBe(200);
            expect(result.body.data).toBeDefined();
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.createdAt).toBeDefined();
            expect(result.body.data.updatedAt).toBeDefined();
            expect(result.body.data.username).toBeDefined();
            expect(result.body.data.username).toEqual(username);
            expect(result.body.data.password).toBeUndefined();
        });

        it('Returns 401 Status and Error Message when Username is found but Password is Invalid', async () => {
            // @ts-ignore
            const result = await request(app)
                .post('/login')
                .send({
                    username: "jimbo",
                    password: "wrong_secret"
                })
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(401);
            expect(result.body.statusCode).toBeDefined();
        });

        it('Returns 401 Status and Error Message when Username and Password are Invalid', async () => {
            // @ts-ignore
            const result = await request(app)
                .post('/login')
                .send({
                    username: "not_jimbo",
                    password: "wrong_secret"
                })
                .set('Accept', 'application/json');


            expect(result.statusCode).toBe(401);
            expect(result.body.message).toBeDefined();
        });

        it('Returns 400 Status and Error Message when No Data is Provided', async () => {
            // @ts-ignore
            const result = await request(app).post('/login')
                .send({})
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(400);
            expect(result.body.message).toBeDefined();
        });
    });

    describe('GET /logout - Logout a user', () => {
        const agent = request.agent(app);
        const username = 'micheal';
        const password = 'too_secret';

        beforeAll(async () => {
            await model.user.create({username, password})
        });

        it('Returns 200 Status and Message if User is not logged in', async () => {
            // @ts-ignore
            const result = await agent
                .get('/logout')
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
            expect(result.body.message).toEqual('Logged out');
        });

        // @ts-ignore
        it('Should start with signin', async () => {
            // @ts-ignore
            const result = await agent
                .post('/login')
                .send({username, password})
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
        });

        it('Returns 200 Status and Message if User was logged in', async () => {
            // @ts-ignore
            const result = await agent
                .get('/logout')
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
            expect(result.body.message).toEqual('Logged out');
        });

    });

    describe('GET /admin - Access admin area', () => {
        const agent = request.agent(app);
        const username = 'jenny';
        const password = 'too_secret';

        beforeAll(async () => {
            await model.user.create({username, password})
        });

        it('Returns 401 Status if User is not logged in',
            authFailGet(agent, '/admin')
        );

        it('Should start with signin',
            login(agent, {username, password})
        );

        it('Returns 200 Status and a Message with the users name if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .get('/admin')
                .set('Accept', 'application/json');

            expect(result.statusCode).toBe(200);
            expect(result.body).toBeDefined();
            expect(result.body.message).toBeDefined();
            expect(result.body.message).toEqual("jenny is logged in");
        });
    });
});

