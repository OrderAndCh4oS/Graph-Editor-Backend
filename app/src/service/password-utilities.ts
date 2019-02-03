const bcrypt = require('bcrypt');

export function passwordHash(user) {
    if (user === null) {
        throw new Error('UserModel not found');
    }
    let salt = bcrypt.genSaltSync();
    return user.password = bcrypt.hashSync(user.password, salt);
}

export function verifyPassword(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
}

export function hidePasswordHash(user) {
// @ts-ignore
    user = user.get({plain: true});
    // @ts-ignore
    delete user.password;
    return user;
}