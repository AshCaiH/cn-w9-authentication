const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {sendSuccess, sendError} = require("../common/responses");
const User = require("../models/users/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);


module.exports = {
    findUser: async(req, res, next) => {
        try {
            const user = await User.findOne({where: {username: req.body.username}});

            req.user = user;
            next();

        } catch (error) {sendError(res, error);}
    },

    hashPass: async (req, res, next) => {
        try {
            if (!req.user) {
                const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
                req.body.password = hashedPassword;

                next();
            } else {
                sendSuccess(res, "Username already in use", {}, 201);
            }
        } catch (error) {sendError(res, error);}
    },

    comparePass: async (req, res, next) => {
        try {
            if(!req.user) {
                sendSuccess(res, "User not found.", {}, 201);
            } else if (await bcrypt.compare(req.body.password, req.user.password)) {
                delete req.user.dataValues["password"];
                next();
            } else{
                sendSuccess(res, "Incorrect password.", {}, 201);
            }

        } catch (error) {sendError(res, error);}
    },

    tokenCheck: async (req, res, next) => {
        try {
            if (!req.header("Authorization")) throw new Error("No token passed");

            const token = req.header("Authorization").replace("Bearer ", "");
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            
            const user = await User.findOne({where : { id: decodedToken.id }});

            if (!user) sendSuccess(res, "User not authorised", {}, 401);

            req.authCheck = user;

            next();
        } catch (error) {sendError(res, error);}
    }
}