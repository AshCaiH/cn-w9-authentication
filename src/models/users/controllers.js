const User = require("./model");
const jwt = require("jsonwebtoken");

const {sendSuccess, sendError} = require("../../common/responses");

module.exports = {
    // Create
    registerUser: async (req, res) => {
        try {
            console.log("bing");

            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            })

            sendSuccess(res, "User successfully registered", {user: user}, 201);
        } catch (error) {sendError(res, error);}
    },

    login: async (req, res) => {
        try {
            const token = jwt.sign({
                id: req.user.id
            }, process.env.JWT_SECRET);

            req.body.loginToken = token;

            sendSuccess(res, "Login successful", {user: req.body}, 201);
        } catch (error) {sendError(res, error)}
    },

    // Read
    listUsers: async (req, res) => {
        try {
            const user = await User.findAll();

            sendSuccess(res, "List of users successfully acquired.", {user: user});
        } catch (error) {sendError(res, error);}
    }
}