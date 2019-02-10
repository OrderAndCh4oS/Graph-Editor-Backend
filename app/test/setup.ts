import db from "../src/model";

beforeEach(async () => {
    // @ts-ignore
    await db.sequelize.sync();
});

afterAll(async (done) => {
    // @ts-ignore
    await db.sequelize.sync({force: true});
    // @ts-ignore
    db.sequelize.close();
    done();
});
