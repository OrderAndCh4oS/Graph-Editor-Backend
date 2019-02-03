import model from "../src/model";

beforeEach(async () => {
    // @ts-ignore
    await model.sequelize.sync();
});

afterAll(async (done) => {
    // @ts-ignore
    await model.sequelize.sync({force: true});
    // @ts-ignore
    model.sequelize.close();
    done();
});
