const bcrypt = require('bcrypt');


export const passwordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const passwordCheck = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}


