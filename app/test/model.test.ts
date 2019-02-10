import * as request from 'supertest';
import db from "../src/model";
import app from "../src/app";
import {authFailGet, authFailPost, authFailPut, login, successTests} from "./utility";

// Todo: look up Jest setup files: https://jestjs.io/docs/en/configuration.html#setupfiles-array

// Todo: Some clues here regarding async hang up: https://github.com/visionmedia/supertest/issues/520


describe('Model Test Suite', () => {

    describe('POST /model - Create a Model', () => {
        const agent = request.agent(app);
        const user = {
            username: 'timothy',
            password: 'too_secret'
        };
        const model = {title: "Do this", description: "This needs to be done"};

        beforeAll(async () => {
            await db.user.create(user);
        });

        it('Returns 401 Status if User is not logged in',
            authFailPost(agent, '/model', model)
        );

        it('Should start with signin',
            login(agent, user)
        );

        it('Returns 200 Status and the created model if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .post('/model')
                .send(model)
                .set('Accept', 'application/json');

            successTests(result);
            expect(result.body.data.title).toBeDefined();
            expect(result.body.data.title).toEqual(model.title);
            expect(result.body.data.description).toBeDefined();
            expect(result.body.data.description).toEqual(model.description);
        });
    });

    describe('PUT /model - Update an existing Model', () => {
        const agent = request.agent(app);
        const user = {
            username: 'jeremy',
            password: 'too_secret'
        };
        const model = {
            id: 1,
            title: "Do this now",
            description: "This needs to be done ASAP"
        };

        beforeAll(async () => {
            await db.user.create(user)
        });

        it('Returns 401 Status if User is not logged in',
            authFailPut(agent, '/model/1', model)
        );

        it('Should start with signin',
            login(agent, user)
        );

        it('Returns 200 Status and the created model if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .put('/model/1')
                .send(model)
                .set('Accept', 'application/json');

            successTests(result);
            expect(result.body.data.title).toBeDefined();
            expect(result.body.data.title).toEqual(model.title);
            expect(result.body.data.description).toBeDefined();
            expect(result.body.data.description).toEqual(model.description);
        });
    });

    describe('GET /model - View Model List', () => {
        const agent = request.agent(app);
        const user = {
            username: 'duncan',
            password: 'too_secret'
        };

        beforeAll(async () => {
            await db.user.create(user)
        });

        it('Returns 401 Status if User is not logged in',
            authFailGet(agent, '/model')
        );

        it('Should start with signin',
            login(agent, user)
        );

        it('Returns 200 Status and a list of Models if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .get('/model')
                .set('Accept', 'application/json');

            successTests(result);
            expect(result.body.data.count).toBeDefined();
            expect(result.body.data.rows).toBeDefined();
        });
    });

    describe('GET /model/:id - View Model Detail', () => {
        const agent = request.agent(app);
        const user = {
            username: 'yanis',
            password: 'too_secret'
        };

        beforeAll(async () => {
            await db.user.create(user)
        });

        it('Returns 401 Status if User is not logged in',
            authFailGet(agent, '/model/1')
        );

        it('Should start with signin',
            login(agent, user)
        );

        it('Returns 200 Status and a list of Models if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .get('/model/1')
                .set('Accept', 'application/json');

            successTests(result);
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.title).toBeDefined();
            expect(result.body.data.description).toBeDefined();
            expect(result.body.data.userId).toBeDefined();
        });
    });
});

