'use strict';

const Category = require('../database/models/Category.Model');
const UserService = require('../service/user.Service');


class categoryService {
    constructor() {
        this.category = Category;
        this.userServ = new UserService();
    }

    async categoresCreate(category) {
        try {
            const newCategory = await this.category.create(category);
            return newCategory;
        } catch (error) {
            throw error;
        }
    }
    // validar que el categoria exista y que el usuario sea el mismo que lo creo
    async findByCategoryId(IdCategory, idUser, userId) {
        try {
            const user = await this.userServ.findByUserId(idUser, userId);
            const result = await this.category.findByIdValidate(IdCategory);
            if (!result) throw new Error('Error al obtener categoria');
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findAllCategory() {

        const result = await this.category.findAll();
        if (!result) throw new Error('Error al obtener categoria');
        return result;

    }
}
module.exports = categoryService;