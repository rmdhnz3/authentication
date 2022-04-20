const LocalStrategy = require("passport-local").Strategy;
const models = require("../models");
const crypto = require("crypto");

function authConfig(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        models.User
            .findOne({
                id: id
            })
            .then(user => {
                done(null, user)
            })
            .catch(err => {
                done(err, null)
            })
    });

    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
            models.User
                .findOne({
                    email: username,
                })
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }

                    var myKey = crypto.createDecipher("aes-128-cbc", "mypassword");
                    var myStr = myKey.update(user.password, "hex", "utf8");
                    myStr += myKey.final("utf8");

                    if (myStr !== password) {
                        return done(null, false);
                    }

                    return done(null, user);
                })
                .catch(err => {
                    return done(err);
                })
        })
    )
}

module.exports = authConfig;