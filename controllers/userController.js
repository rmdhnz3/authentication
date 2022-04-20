const crypto = require("crypto");
const model = require("../models");

exports.createUser = (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    
    let myKey = crypto.createCipher("aes-128-cbc", "mypassword");
    let myStr = myKey.update(password, "utf8", "hex");
    myStr += myKey.final("hex");

    const hashPass = myStr
    
    model.User
        .create({
            name: name,
            email: email,
            password: hashPass
        })
        .then(user => {
            return res.json({
                msg: "Success, user added",
                user
            })
        })
        .catch(err => {
            return res.json({
                msg: "Error",
                err
            })
        })
}