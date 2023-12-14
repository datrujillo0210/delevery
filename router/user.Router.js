'use strict';

const express = require('express');
const passport = require('passport');

// const userService = require('../service/user.Service');
const UserService = require("../service/user.Service");
const { validateToken } = require('../middleware/authValidation');

// const authResponse = require('../helpers/authResponse');
// const authMiddleware = require('../middleware/authValidation');


function userRoute(app, upload) {
    const router = express.Router();
    const userServ = new UserService()

    app.use('/api/users', router);

    router.get("/", async (req, res, next) => {
        try {
            const result = await userServ.getAllUsers();
            res.json({
                success: true,
                message: "get all users",
                result
            })
        } catch (err) {
            console.log(`Error: ${err}`);
            return res.status(501).json({
                success: false,
                message: "Error: al obtener los usuarios",
                err
            });
            // next(err);
        }
    });
    // ,validateToken,
    //!validar quien hace la peticion de registro de usuario
    router.get("/findByUserId/:idUser", passport.authenticate('jwt', { session: false }), async (req, res, next) => { // el jwt es el nombre de la estrategia que se creo en el passport.js para validar el token osea el token debe de tener el jwt en el header 
        try {
            const idUser = req.user.id;
            const userId = req.params.idUser;

            const result = await userServ.findByUserId(userId, idUser);
            res.json({
                success: true,
                message: "get all",
                data: result
            })
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: "Error: al obtener los usuarios",
                error
            });
            // next(err);
        }
    });

    router.put("/update", 
        passport.authenticate('jwt', { session: false }),
        upload.array('image', 1)
    , async (req, res, next) => {
        try {
            const user = JSON.parse(req.body.user);
            const files = req.files;
            const result = await userServ.updateWithimages(user, files)
            return res.status(201).json({
                message: "Usuario actualizado con exito",
                success: true,
                error: null,
            })
        } catch (err) {
            console.log(`Error: ${err}`);
            return res.status(501).json({
                message: "Error: al actualizar el usuario",
                error: err.message,
                success: false,
            });
        }
    });

    // metodo logout
    router.post("/logout", async (req, res, next) => {
        try {
            // const result = await userServ.logout(req.user.id);
            const result = await userServ.logout(req.body.id);
            return res.status(201).json({
                message: "Se ha cerrado la sesion con exito",
                success: true,
                error: null,
            })
        } catch (err) {
            console.log(`Error: ${err}`);
            return res.status(501).json({
                message: "Error: al desloguear el usuario",
                error: err.message,
                success: false,
            });
        }
    });

}
module.exports = userRoute;