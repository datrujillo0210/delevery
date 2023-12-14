

const UserService = require('../service/user.Service');
const categoryService = require('./Category.Service');
const Storage = require('../utils/cloud_storage');


const Product = require('../database/models/product.Model');

const async_foreach = require('../utils/async_foreach');


class ProductService {
    constructor() {
        this.product = Product;
        this.userServ = new UserService();
        this.categoryServ = new categoryService();

    }

    async createCategory(product, idUser, userId, files) {

        // await this.userServ.findByUserId(idUser, userId);
        // await this.categoryServ.findByCategoryId(data.category_id, idUser, userId);


        let inserts = 0;

        if (files.length === 0) {
            throw new Error("No se ha enviado ninguna imagen")
        }
        const data = await this.product.create(product);
        product.id = data.id; // asignar el id del producto creado

        const start = async () => {
            await async_foreach(files, async (file) => {
                const pathImage = `image_${Date.now()}`
                const url = await Storage(file, pathImage);

                if (url !== undefined && url !== null) {
                    if (inserts === 0) { // guardar la primera imagen como principal
                        product.image1 = url;
                    } else if (inserts === 1) {
                        product.image2 = url;
                    } else if (inserts === 2) {
                        product.image3 = url;
                    }
                }
                await this.product.update(product);
                inserts = inserts + 1;

                if (inserts === files.length) {
                    return true;
                    // return { 
                    //     success: true,
                    //     message: "Producto creado correctamente",
                    // }
                }

            });
        }

        await start();

        // return 
    }
}

module.exports = ProductService;