const User = require("./model");

const sendError = (res, error) => {
    res.status(500).json({
        message: error.message,
        error: error,
    });
}

const sendSuccess = (res, message, extra, status) => {
    res.status(status || 200).json({message, ...extra});
}

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

    // Read
    listUsers: async (req, res) => {
        try {
            const user = await User.findAll();

            sendSuccess(res, "List of users successfully acquired.", {user: user});
        } catch (error) {sendError(res, error);}
    }
}