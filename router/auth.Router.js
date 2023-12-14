'use strict';

const express = require('express');
const storage = require('../utils/cloud_storage');


const AuthService = require("../service/auth.Service");
const UserService = require('../service/user.Service');

const User = require('../database/models/user.Model');
const Role = require('../database/models/role.Model');


function AuthRoute(app, upload) {
    const router = express.Router();
    const authServ = new AuthService()

    app.use('/api/auth', router);



    router.post("/login", async (req, res, next) => {
        try {
            const result = await authServ.login(req.body)
            res.json({
                message: "login successfully",
                error: null,
                success: true,
                data: result
            })


        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: error.message,
                error: error.message,
                success: false,
            })
        }
    })


    // router.post("/signup", async (req, res, next) => {
    //     try {
    //         const result = await authServ.signup(req.body)
    //         return res.status(201).json({
    //             message: "El usuario se creo correctamente, inicie sesion",
    //             error: null,
    //             success: true,
    //             data: result.id
    //         })
    //     } catch (err) {
    //         console.log(`Error: ${err}`);
    //         return res.status(501).json({
    //             message: "Error: al crear el usuario",
    //             error : err.message,
    //             success: false,
    //         });
    //     }
    // });


    router.post("/signup", upload.array('image', 1), async (req, res, next) => {
        try {
            const user = JSON.parse(req.body.user);
            const files = req.files;
            const result = await authServ.signupWithimages(user, files)
            return res.status(201).json({
                message: "El usuario se creo correctamente, inicie sesion",
                success: true,
                error: null,
                data: result.id
            })
        } catch (err) {
            console.log(`Error: ${err}`);
            return res.status(501).json({
                message: "Error: al crear el usuario",
                error: err.message,
                success: false,
            });
        }
    });

}
module.exports = AuthRoute;