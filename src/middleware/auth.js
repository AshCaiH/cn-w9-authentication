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
    }
}