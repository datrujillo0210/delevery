const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../database/models/user.Model');
const {config} = require('../config/config');

module.exports = function(passport) {

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secretOrKey;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id, (err, user) => {
            const results = {
                err: [err, false],
                user: [null, user],
                default: [null, false]
            };
            
            return done(...(results[err ? 'err' : user ? 'user' : 'default']));
        })
    }))

}


// if (err) {
//     return done(err, false);
// } 
// if (user) {
//     return done(null, user);
// }
// else {
//     return done(null, false);
// }