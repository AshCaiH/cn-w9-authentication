const bcrypt = require("bcrypt");

const {sendSuccess, sendError} = require("../common/responses");
const User = require("../models/users/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);


module.exports = {
    hashPass: async (req, res, next) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;

            next();
        } catch (error) {sendError(res, error);}
    },

    comparePass: async (req, res, next) => {
        try {
            console.log(req.body);

            const user = await User.findOne({where: {username: req.body.username}});

            console.log(req.body.password, user.password);

            if(await bcrypt.compare(req.body.password, user.password)) {
                next();
            } else{
                sendSuccess(res, "Incorrect password.");
            }

        } catch (error) {sendError(res, error);}
    },
}