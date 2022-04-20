const passport = require("passport");

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.json({
                msg: err
            })
        }

        if (!user) {
            return res.json({
                msg: "Email or password incorrect"
            })
        }

        return res.json({
            msg: "Success, you've been logged in ",
            user : {
                "id" : user.id,
                "email" : user.email,
                "name" : user.name
            }
        })
    })(req, res, next)
}

exports.logout = (req, res, next) => {
    req.logout();
    return res.json({
        msg: "Success, you've been logged out"
    })
}