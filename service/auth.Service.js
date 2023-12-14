const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserService = require('../service/user.Service');

const User = require('../database/models/user.Model');
const { config } = require('../config/config');

const storage = require('../utils/cloud_storage');



class authService {

    constructor() {
        this.userService = new UserService();

    }

    async login(body) {
        const email = body.email;
        const password = body.password;

        const myUser = await User.findByEmail(email);
        await this.#comparePassword(password, myUser.password);

        const token = this.#createToken(myUser);
        // myUser.session_token = token;
        // await User.update(myUser);
        const data = {
            id: myUser.id,
            name: myUser.name,
            lastname: myUser.lastname,
            email: myUser.email,
            phone: myUser.phone,
            image: myUser.image,
            session_token: `JWT ${token}`,
            roles: myUser.roles
        }

        await User.updateSessionToken(myUser.id, data.session_token);

        return data;
    }

    // async signup(data) {
    //     // const results = await User.create(data);
    //     const results = await this.userService.createUser(data);
    //     return results;

    // }
    async signupWithimages(user, files) {
        if (files.length > 0) {
            const pathImage = `images_${Date.now()}`
            const url = await storage(files[0], pathImage, null)
            if (url != undefined || url != null) {
                user.image = url
            }
        }
        const results = await this.userService.createUser(user);
        return results;
    }

    #createToken(user) {
        const payload = {
            id: user.id,
            // email: user.email,
            // name: user.name,
            // lastname: user.lastname,
            // image: user.image,
            // phone: user.phone,
            // session_token: user.session_token
        };
        const token = jwt.sign(payload, config.secretOrKey, {
            // expiresIn: 60 * 2 // 2 MINUTOS
            // expiresIn: 60 * 60 * 24 // 1 HORA
        });
        return token;
    }

    async #comparePassword(string, hash) {
        try {
            const result = await bcrypt.compare(string, hash)
            if (!result) throw new Error('Incorrect password');
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

}
module.exports = authService;