import db from "../model";

export const syncSchema = () => {
    // @ts-ignore
    db.sequelize.sync()
        .then(() => console.log('Schema built.'))
        .catch(err => {
            console.log(err.name);
            console.log('Retrying in one second...');
            setTimeout(syncSchema, 1000);
        });
};
