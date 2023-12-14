'use strict';

const express = require('express');
const passport = require('passport');

const ProductService = require("../service/product.Servise");


function productRoute(app, upload) {
    const router = express.Router();
    const ProductServ = new ProductService()

    app.use('/api/products', router);

    router.post("/create",
        passport.authenticate('jwt', { session: false }),
        upload.array('image', 3),
        async (req, res, next) => {
            try {
                let product = JSON.parse(req.body.product);
                const idUser = req.user.id;
                const userId = req.body.userId;
                const files = req.files;
                const result = await ProductServ.createCategory(product, idUser, userId, files);
                return res.status(201).json({
                    message: "Producto creado correctamente ",
                    success: true,
                    error: null,
                    // data: result.id
                })
            } catch (error) {
                console.error(`Error: ${error}`);
                return res.status(501).json({
                    message: error.message,
                    error: error.message,
                    success: false,
                });
            }
        });
}
module.exports = productRoute;