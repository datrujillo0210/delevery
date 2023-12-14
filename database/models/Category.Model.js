const db = require('../db');

const Category = {};


// find all
Category.findAll = () => {
    const sql = `
        SELECT
            id,
            name,
            description
        FROM
            categories
        ORDER BY 
            name
    `;
    return db.manyOrNone(sql);
};

// find create
Category.create = (category) => {
    const sql = `
        INSERT INTO
        categories(
                name,
                description
            )
        VALUES($1, $2) RETURNING id
    `;
    return db.oneOrNone(sql,
        [
            category.name,
            category.description
        ]);
};


//find user by id vaslidate category
Category.findByIdValidate = (id) => {
    const sql = `
        SELECT
            *
        FROM
            categories
        WHERE
            id = $1
    `;
    // return db.oneOrNone(sql, [id]);
    const category = db.oneOrNone(sql, [id]);
    if (!category) throw new Error('Category not found');
    return category;
};

module.exports = Category;