const { Router } = require("express");
const userRouter = Router();

const controllers = require("./controllers");
const auth = require("../../middleware/auth");

// Create
userRouter.post("/users/register", auth.findUser, auth.hashPass, controllers.registerUser);

userRouter.post("/users/login", auth.findUser, auth.comparePass, controllers.login);

// Read
userRouter.get("/users", controllers.listUsers);

module.exports = userRouter
