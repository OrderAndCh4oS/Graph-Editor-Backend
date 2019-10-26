import db from "../model";

export const syncSchema = (force = false) => {
    // @ts-ignore
    return db.sequelize.sync({force})
        .then(() => console.log('Schema built.'))
        .catch(err => {
            console.log(err.name);
            console.log('Retrying in one second...');
            setTimeout(syncSchema, 1000);
        });
};
