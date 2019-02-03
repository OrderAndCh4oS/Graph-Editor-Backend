import model from "../model";

export const syncSchema = () => {
    // @ts-ignore
    model.sequelize.sync()
        .then(() => console.log('Schema built.'))
        .catch(err => {
            console.log(err.name);
            console.log('Retrying in one second...');
            setTimeout(syncSchema, 1000);
        });
};
