import * as request from 'supertest';
import model from "../src/model";
import app from "../src/app";
import {authFailGet, authFailPost, authFailPut, login, successTests} from "./utility";

// Todo: look up Jest setup files: https://jestjs.io/docs/en/configuration.html#setupfiles-array

// Todo: Some clues here regarding async hang up: https://github.com/visionmedia/supertest/issues/520


describe('Auth Test Suite', () => {

    describe('POST /task - Create a Task', () => {
        const agent = request.agent(app);
        const user = {
            username: 'timothy',
            password: 'too_secret'
        };
        const task = {title: "Do this", description: "This needs to be done"};

        beforeAll(async () => {
            await model.user.create(user)
        });

        it('Returns 401 Status if User is not logged in',
            authFailPost(agent, '/task', task)
        );

        it('Should start with signin',
            login(agent, user)
        );

        it('Returns 200 Status and the created task if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .post('/task')
                .send(task)
                .set('Accept', 'application/json');

            successTests(result);
            expect(result.body.data.title).toBeDefined();
            expect(result.body.data.title).toEqual(task.title);
            expect(result.body.data.description).toBeDefined();
            expect(result.body.data.description).toEqual(task.description);
        });
    });

    describe('PUT /task - Update an existing Task', () => {
        const agent = request.agent(app);
        const user = {
            username: 'jeremy',
            password: 'too_secret'
        };
        const task = {
            id: 1,
            title: "Do this now",
            description: "This needs to be done ASAP"
        };

        beforeAll(async () => {
            await model.user.create(user)
        });

        it('Returns 401 Status if User is not logged in',
            authFailPut(agent, '/task/1', task)
        );

        it('Should start with signin',
            login(agent, user)
        );

        it('Returns 200 Status and the created task if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .put('/task/1')
                .send(task)
                .set('Accept', 'application/json');

            successTests(result);
            expect(result.body.data.title).toBeDefined();
            expect(result.body.data.title).toEqual(task.title);
            expect(result.body.data.description).toBeDefined();
            expect(result.body.data.description).toEqual(task.description);
        });
    });

    describe('GET /task - View Task List', () => {
        const agent = request.agent(app);
        const user = {
            username: 'duncan',
            password: 'too_secret'
        };

        beforeAll(async () => {
            await model.user.create(user)
        });

        it('Returns 401 Status if User is not logged in',
            authFailGet(agent, '/task')
        );

        it('Should start with signin',
            login(agent, user)
        );

        it('Returns 200 Status and a list of Tasks if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .get('/task')
                .set('Accept', 'application/json');

            successTests(result);
            expect(result.body.data.count).toBeDefined();
            expect(result.body.data.rows).toBeDefined();
        });
    });

    describe('GET /task/:id - View Task Detail', () => {
        const agent = request.agent(app);
        const user = {
            username: 'yanis',
            password: 'too_secret'
        };

        beforeAll(async () => {
            await model.user.create(user)
        });

        it('Returns 401 Status if User is not logged in',
            authFailGet(agent, '/task/1')
        );

        it('Should start with signin',
            login(agent, user)
        );

        it('Returns 200 Status and a list of Tasks if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .get('/task/1')
                .set('Accept', 'application/json');

            successTests(result);
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.title).toBeDefined();
            expect(result.body.data.description).toBeDefined();
            expect(result.body.data.userId).toBeDefined();
        });
    });
});

