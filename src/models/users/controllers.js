const User = require("./model");
const jwt = require("jsonwebtoken");

const {sendMessage: sendMessage, sendError} = require("../../common/responses");

module.exports = {
    // Create
    registerUser: async (req, res) => {
        try {
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            })

            sendMessage(res, "User successfully registered", {user: user}, 201);
        } catch (error) {sendError(res, error);}
    },

    login: async (req, res, next) => {
        try {

            if (req.authCheck) {

                const user = {
                    id: req.authCheck.id,
                    username: req.authCheck.username,
                }

                if (!next) sendMessage(res, "Persistent login successful", {user: user}, 201);
                else next();

            } else if (req.user) {
                const token = jwt.sign({
                    id: req.user.id
                }, process.env.JWT_SECRET);

                req.body.loginToken = token;

                sendMessage(res, "Login successful", {user: req.body}, 201);
            }
        } catch (error) {sendError(res, error)}
    },

    // Read
    listUsers: async (req, res) => {
        try {
            if (req.authCheck) {
                const user = await User.findAll();

                sendMessage(res, "List of users successfully acquired.", {user: user});
            } else {
                sendMessage(res, "Sorry, this feature is for logged-in users only.", {}, 401);
            }
        } catch (error) {sendError(res, error)};
    },

    // Update
    updateUser: async (req, res) => {

    },

    // Delete
    deleteUser: async (req, res) => {
        try {
            const user = await User.destroy({where: {username: req.body.username}});
            sendMessage(res, "User successfully deleted.", {user: user});
            
        } catch (error) {sendError(res, error)};
    },
}