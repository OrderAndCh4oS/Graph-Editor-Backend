import * as request from 'supertest';
import db from "../src/model";
import app from "../src/app";
import {authFailGet, authFailPost, authFailPut, login, successDataTest, successResponseTests} from "./utility";

// Todo: look up Jest setup files: https://jestjs.io/docs/en/configuration.html#setupfiles-array

// Todo: Some clues here regarding async hang up: https://github.com/visionmedia/supertest/issues/520

describe('Node Test Suite', () => {

    describe('POST /node - Create a Node', () => {
        const agent = request.agent(app);
        const user = {
            username: 'jill',
            password: 'too_secret'
        };
        const model = {
            title: "Dogs in UK",
            description: "Something about cats."
        };
        const nodes = [
            {
                id: 'households',
                label: 'No. Households in the UK',
                suffix: 'm',
                title: 'Number of Households in the UK',
                color: '#67da88',
                value: 27000000,
                conv: 0.000001,
                min: null,
                max: null,
                step: null,
                equn: null,
                prefix: null,
            },
            {
                id: 'percDogOwners',
                label: 'Percentage of Dog Owners',
                suffix: 'm',
                title: 'Percentage of Households in the UK that are Dog Owners',
                color: '#67da88',
                value: 0.27,
                conv: 100,
                min: 0,
                max: 100,
                step: 1,
                equn: null,
                prefix: null
            },
            {
                id: 'averageDogs',
                label: 'Average Number of Dogs',
                suffix: 'm',
                title: 'Average Number of Dogs per Household in the UK',
                color: '#67da88',
                value: 2.1,
                conv: 1,
                min: 0,
                max: 15,
                step: 0.1,
                equn: null,
                prefix: null
            },
            {
                id: 'cats',
                label: 'No. of Dogs',
                suffix: 'm',
                title: 'Number of Dogs in the UK',
                color: '#da7a2f',
                value: null,
                conv: 0.000001,
                min: null,
                max: null,
                step: null,
                equn: '({households}*{percDogOwners})*{averageDog}',
                prefix: null,
            }
        ];

        beforeAll(async () => {
            await db.user.create(user)
                .then(user => {
                    const modelOne = db.model.create(model);
                    user.setModels([modelOne]);
                });
        });

        it('Returns 401 Status if User is not logged in',
            authFailPost(agent, '/model/1/node', nodes[0])
        );

        it('Should start with signin',
            login(agent, user)
        );

        it('Returns 200 Status and the created node if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .post('/model/1/node')
                .send(nodes[0])
                .set('Accept', 'application/json');

            successResponseTests(result);
            successDataTest(nodes[0], result);
        });

        it('Returns 200 Status and the all nodes on the model when posting and array of nodes if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .post('/model/1/node')
                .send(nodes)
                .set('Accept', 'application/json');

            successResponseTests(result);
            expect(result.body.data).toBeDefined();
            // Todo: Write a better test to check array
        });
    });

    describe('PUT /node - Update an existing Node', () => {
        const agent = request.agent(app);
        const user = {
            username: 'jeremy',
            password: 'too_secret'
        };
        const model = {
            title: "Cats in UK",
            description: "Something about cats."
        };
        const nodes = [
            {
                id: 'households',
                label: 'No. Households',
                suffix: 'm',
                title: 'The Number of Households in the UK',
                color: '#67da88',
                value: 27000000,
                conv: 0.000001,
                min: null,
                max: null,
                step: null,
                equn: null,
                prefix: null,
            },
            {
                id: 'percCatOwners',
                label: 'Percentage of Cat Owners',
                suffix: 'm',
                title: 'Percentage of Households in the UK that are Cat Owners',
                color: '#67da88',
                value: 0.27,
                conv: 100,
                min: 0,
                max: 100,
                step: 1,
                equn: null,
                prefix: null
            },
            {
                id: 'averageCats',
                label: 'Average Number of Cats',
                suffix: 'm',
                title: 'Average Number of Cats per Household in the UK',
                color: '#67da88',
                value: 2.1,
                conv: 1,
                min: 0,
                max: 15,
                step: 0.1,
                equn: null,
                prefix: null
            },
            {
                id: 'cats',
                label: 'No. of Cats',
                suffix: 'm',
                title: 'Number of Cats in the UK',
                color: '#da7a2f',
                value: null,
                conv: 0.000001,
                min: null,
                max: null,
                step: null,
                equn: '({households}*{percCatOwners})*{averageCat}',
                prefix: null,
            }
        ];

        beforeAll(async () => {
            await db.user.create(user)
                .then(user => {
                    const modelOne = db.model.create(model)
                        .then(m => {
                            const node = db.node.create(nodes[0]);
                            m.setNodes([node])
                        });
                    user.setModels([modelOne]).then(d => console.log(d));
                });
        });

        it('Returns 401 Status if User is not logged in',
            () => {
                db.node.findOne({where: {id: 'households'}}).then(
                    node =>
                        authFailPut(agent, '/node/' + node.uuid, nodes[0])
                );
            }
        );

        it('Should start with signin',
            login(agent, user)
        );

        it('Returns 200 Status and the created node if User is logged in', () => {
            db.node.findOne({where: {id: 'households'}}).then(async (node) => {
                // @ts-ignore
                const result = await agent
                    .put('/node/' + node.uuid)
                    .send(nodes[1])
                    .set('Accept', 'application/json');

                successResponseTests(result);
                successDataTest(nodes[1], result);
            });
        });
    });

    describe('GET /model/:id/node - View Node List', () => {
        const agent = request.agent(app);
        const user = {
            username: 'duncan',
            password: 'too_secret'
        };

        beforeAll(async () => {
            await db.user.create(user)
        });

        it('Returns 401 Status if User is not logged in',
            authFailGet(agent, '/model/1/node')
        );

        it('Should start with signin',
            login(agent, user)
        );

        it('Returns 200 Status and a list of Nodes if User is logged in', async () => {
            // @ts-ignore
            const result = await agent
                .get('/model/1/node')
                .set('Accept', 'application/json');

            successResponseTests(result);
            expect(result.body.data.count).toBeDefined();
            expect(result.body.data.rows).toBeDefined();
        });
    });

    describe('GET /node/:id - View Node Detail', () => {
        const agent = request.agent(app);
        const user = {
            username: 'yanis',
            password: 'too_secret'
        };

        beforeAll(async () => {
            await db.user.create(user)
        });

        it('Returns 401 Status if User is not logged in',
            authFailGet(agent, '/node/1')
        );

        it('Should start with signin',
            login(agent, user)
        );

        it('Returns 200 Status and a list of Nodes if User is logged in', () => {
            db.node.findOne({where: {id: 'households'}}).then(async (node) => {
                // @ts-ignore
                const result = await agent
                    .get('/node/' + node.uuid)
                    .set('Accept', 'application/json');

                successResponseTests(result);
                expect(result.body.data.id).toBeDefined();
                expect(result.body.data.title).toBeDefined();
                expect(result.body.data.description).toBeDefined();
                expect(result.body.data.userId).toBeDefined();
            });
        });
    });
});

