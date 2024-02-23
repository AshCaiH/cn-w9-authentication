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

            if (req.user) {
                const token = jwt.sign({
                    id: req.user.id
                }, process.env.JWT_SECRET);

                req.body.loginToken = token;
                delete req.body.password;

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

    confirmToken: async (req, res) => {
        try {
            if (req.authCheck) {
                const user = {
                    username: req.authCheck.username,
                    loginToken: req.header("Authorization").replace("Bearer ", ""),
                }
                sendMessage(res, "User acquired.", {user: user});
            } else {
                sendMessage(res, "No token found.", {}, 401);
            }
        } catch (error) {sendError(res, error)};
    },

    // Update
    updateUser: async (req, res) => {
        sendMessage(res, "This feature is yet to be implemented.");
    },

    // Delete
    deleteUser: async (req, res) => {
        try {
            console.log(req.authCheck);
            if (req.authCheck) {
                const user = await User.destroy({where: {id: req.authCheck.id}});
                sendMessage(res, "User successfully deleted.", {user: user});
            } else {
                sendMessage(res, "You cannot delete a user account you aren't logged into.", {}, 401);
            }            
        } catch (error) {sendError(res, error)};
    },
}