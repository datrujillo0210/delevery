'use strict';

const bcrypt = require('bcrypt');
const db = require('../db');

const User = {};

// find user
User.getAll = () => {
    const sql = `
        SELECT * FROM users
    `;
    return db.manyOrNone(sql);
};

// find user by id
User.findById = (id, callback) => {
    const sql = `SELECT id,email,name,lastname,image,phone,password,session_token 
         FROM 
            users
                WHERE id = $1
    `;
    return db.oneOrNone(sql, id).then((user) => {
        callback(null, user);
    }).catch((error) => {
        callback(error, null);
    });
};

//find user by id
User.findByUserId = async (idUser) => {
    const sql = `SELECT 
    u.id,
    u.email,
    u.name,
    u.lastname,
    u.image,
    u.phone,
    password,
    session_token,
    json_agg(
        json_build_object(
            'id', R.id,
            'name', R.name,
            'image', R.image,
            'route', R.route
        )
    ) AS roles
    FROM
        users As u
    INNER JOIN user_has_role As UHR
        ON UHR.user_id = u.id
    INNER JOIN roles As R
        ON R.id = UHR.role_id
    WHERE
        u.id = $1
    GROUP BY
        u.id
        -- u.email,
        -- u.name,
        -- u.lastname,
        -- u.image,
        -- u.phone,
        -- password,
        -- session_token
    `

    const user = await db.oneOrNone(sql, idUser);
    if (!user) throw new Error('User not found by id');
    return user;

    // return db.oneOrNone(sql, email);

}


// find user by email
User.findByEmail = async (email) => {
    const sql = `SELECT 
    u.id,
    u.email,
    u.name,
    u.lastname,
    u.image,
    u.phone,
    password,
    session_token,
    json_agg(
        json_build_object(
            'id', R.id,
            'name', R.name,
            'image', R.image,
            'route', R.route
        )
    ) AS roles
    FROM
        users As u
    INNER JOIN user_has_role As UHR
        ON UHR.user_id = u.id
    INNER JOIN roles As R
        ON R.id = UHR.role_id
    WHERE
        u.email = $1
    GROUP BY
        u.id
        -- u.email,
        -- u.name,
        -- u.lastname,
        -- u.image,
        -- u.phone,
        -- password,
        -- session_token
    `

    const user = await db.oneOrNone(sql, email);
    if (!user) throw new Error('User not found');
    return user;

    // return db.oneOrNone(sql, email);

}

// create users
User.create = (user) => {
    // hash password.
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;

    const sql = `
        INSERT INTO
            users(
                email,  
                name,
                lastname,
                phone,
                image,
                password
            )
        values($1,$2,$3,$4,$5,$6) RETURNING id        
    `;
    return db.one(sql, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password
    ]);
};

User.update = (user) => {
    const sql = `
        UPDATE
            users
        SET
            name = $2,
            lastname = $3,
            phone = $4,
            image = $5
        WHERE
            id = $1
    `;
    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        new Date()
    ]);
    // const userUpdated = db.one(sql, [
    //     user.id,
    //     user.name,
    //     user.lastname,
    //     user.phone,
    //     user.image,
    // ]);
    // if (!userUpdated) throw new Error('User not updated');
    // return userUpdated;
};

User.updateSessionToken = async (id,token) => {
    const sql = `
        UPDATE
            users
        SET
            session_token = $2
        WHERE
            id = $1
    `;
    // retornar con operador ternario
    const response = await db.none(sql, [
        id,
        token,
    ]);

    return response ? response : new Error('Token not updated');
    
    
};
module.exports = User;


// return 
    
//     db.none(sql, [
//         id,
//         token,
//     ]);