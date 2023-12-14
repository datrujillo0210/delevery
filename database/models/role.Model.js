const db = require('../db');

const Role = {};

// find create
Role.create = (user_id, role_id) => {
    const sql = `
        INSERT INTO
            user_has_role(
                user_id,
                role_id
            )
        VALUES($1, $2)
    `;
    return db.none(sql, 
        [
            user_id, 
            role_id
        ]);
};

module.exports = Role;